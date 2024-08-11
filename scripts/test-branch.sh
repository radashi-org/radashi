# Get the list of changed files relative to the main branch.
CHANGED_FILES=$(git diff main..HEAD --name-only -- 'src/**/*.ts' 'tests/**/*.test.ts' '!src/*.ts')

# If a test file was changed, its source file will also be collected.
# Likewise, if a source file was changed, its test file will be
# collected. Test files are collected for Vitest to use as a test
# filter. Source files are collected for coverage filtering.
TEST_FILES=()
SOURCE_FILES=()

# This function adds a source file to the SOURCE_FILES array and its
# corresponding test file to the TEST_FILES array.
add_source_file() {
  if [[ ! " ${SOURCE_FILES[@]} " =~ " $1 " ]]; then
    SOURCE_FILES+=("$1")
  fi

  test_file=${1/src/tests}
  test_file=${test_file/.ts/.test.ts}
  if [[ ! " ${TEST_FILES[@]} " =~ " ${test_file} " ]]; then
    TEST_FILES+=("$test_file")
  fi
}

# Populate the SOURCE_FILES array so we can loop over them later.
for file in $CHANGED_FILES; do
  if [[ $file == src/* ]]; then
    add_source_file "$file"
  fi
done

# Recursive search for dependent functions. Their source files need to
# be tested, in case they are affected by changes to their
# dependencies.
index=0
while [ $index -lt ${#SOURCE_FILES[@]} ]; do
  file=${SOURCE_FILES[$index]}

  func_name=$(basename $file)
  func_name=${func_name/.ts/}

  if command -v rg &> /dev/null; then
    IMPORTERS=$(rg "import[^}]*?\b$func_name\b" -U -l -- src)

    for importer in $IMPORTERS; do
      if [[ ! " ${SOURCE_FILES[@]} " =~ " ${importer} " ]]; then
        add_source_file "$importer"
      fi
    done
  else
    echo -e "ripgrep (rg) is not installed. Please install it to use this script:\n"
    echo "  > brew install ripgrep"
    echo "  > sudo apt-get install ripgrep"
    echo -e "\n  https://github.com/BurntSushi/ripgrep/blob/master/README.md#installation\n"
    exit 1
  fi

  index=$((index + 1))
done

# Test files need their source files included in coverage, so we need
# to add them to the SOURCE_FILES array before building the coverage
# options. Also, we explicitly avoid adding importers of these source
# files, since only the test has changed.
for file in $CHANGED_FILES; do
  if [[ $file == tests/* ]]; then
    src_file=${file/tests/src}
    src_file=${src_file/.test.ts/.ts}

    # If it's already a test file, add it directly if not already present
    if [[ ! " ${TEST_FILES[@]} " =~ " ${file} " ]]; then
      TEST_FILES+=("$file")
    fi
    if [[ ! " ${SOURCE_FILES[@]} " =~ " ${src_file} " ]]; then
      SOURCE_FILES+=("$src_file")
    fi
  fi
done

# Build the coverage options
ARGV=("--coverage")
for file in "${SOURCE_FILES[@]}"; do
  ARGV+=("--coverage.include=$file")
done

pnpm -s vitest ${TEST_FILES[*]} ${ARGV[*]} "$@"

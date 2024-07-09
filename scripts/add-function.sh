NAME="$1"

if [ -z "$NAME" ]; then
  echo "Usage: $0 <group-name>/<function-name>"
  exit 1
fi

# Split NAME into GROUP_NAME and FUNC_NAME
IFS='/' read -r GROUP_NAME FUNC_NAME <<< "$NAME"

if [ -z "$GROUP_NAME" ] || [ -z "$FUNC_NAME" ]; then
  echo "Error: Invalid input format. Please use <group-name>/<function-name>"
  exit 1
fi

# Check if the group directory exists in src
if [ ! -d "src/$GROUP_NAME" ]; then
  echo "Warning: The group '$GROUP_NAME' does not exist in the src directory."
  read -n 1 -p "Are you sure you want to create a new group? (Y/n) " confirm
  echo
  if [ "$confirm" == "n" ]; then
    echo "Operation cancelled."
    exit 1
  fi
fi

# Create the function in the following files:
#   - src/<group-name>/<function-name>.ts
#   - tests/<group-name>/<function-name>.test.ts
#   - benchmarks/<group-name>/<function-name>.bench.ts
#   - docs/<group-name>/<function-name>.mdx

SRC_DIR="src/$GROUP_NAME"
DOCS_DIR="docs/$GROUP_NAME"
TESTS_DIR="tests/$GROUP_NAME"
BENCHMARKS_DIR="benchmarks/$GROUP_NAME"

SRC_FILE="$SRC_DIR/$FUNC_NAME.ts"
TESTS_FILE="$TESTS_DIR/$FUNC_NAME.test.ts"
BENCHMARKS_FILE="$BENCHMARKS_DIR/$FUNC_NAME.bench.ts"
DOCS_FILE="$DOCS_DIR/$FUNC_NAME.mdx"

if [ ! -f "$DOCS_FILE" ]; then
  # Prompt the user for a description:
  echo "Enter a description for $FUNC_NAME:"
  read -r DESCRIPTION

  mkdir -p "$DOCS_DIR"
  echo -e "---\ntitle: $FUNC_NAME\ndescription: $DESCRIPTION\n---\n\n### Usage\n\nDoes a thing. Returns a value.\n\n\`\`\`ts\nimport * as _ from 'radashi'\n\n_.$FUNC_NAME()\n\`\`\`" > "$DOCS_FILE"
else
  echo "Warning: $DOCS_FILE already exists. Skipping."
fi

if [ ! -f "$SRC_FILE" ]; then
  mkdir -p "$SRC_DIR"
  echo -e "export function $FUNC_NAME(): void {}\n" > "$SRC_FILE"
else
  echo "Warning: $SRC_FILE already exists. Skipping."
fi

if [ ! -f "$TESTS_FILE" ]; then
  mkdir -p "$TESTS_DIR"
  echo -e "import * as _ from 'radashi'\n\ndescribe('$FUNC_NAME', () => {\n  test('does a thing', () => {\n    expect(_.$FUNC_NAME()).toBe(undefined)\n  })\n})\n" > "$TESTS_FILE"
else
  echo "Warning: $TESTS_FILE already exists. Skipping."
fi

if [ ! -f "$BENCHMARKS_FILE" ]; then
  mkdir -p "$BENCHMARKS_DIR"
  echo -e "import * as _ from 'radashi'\nimport { bench } from 'vitest'\n\ndescribe('$FUNC_NAME', () => {\n  bench('with no arguments', () => {\n    _.$FUNC_NAME()\n  })\n})\n" > "$BENCHMARKS_FILE"
else
  echo "Warning: $BENCHMARKS_FILE already exists. Skipping."
fi

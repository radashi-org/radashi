# Measure the byte size of each function when bundled and minified by
# ESBuild. You can pass in a number to find functions with >= the
# given byte size.

weigh_functions() {
  for dir in src/*; do
    if [ -d "$dir" ]; then
      for file in "$dir"/*.ts; do
        if [ -f "$file" ]; then
          bytes=$(esbuild --bundle --minify "$file" | wc -c)
          echo -e "$(printf '%-28s' "${file#src/}")\t$bytes"
        fi
      done
    fi

  done
}

filter_by_size() {
  local min_size=$1
  while read -r line; do
    size=$(echo "$line" | awk '{print $2}')
    if [ "$size" -ge "$min_size" ]; then
      echo "$line"
    fi
  done
}

if [ $# -eq 1 ] && [[ $1 =~ ^[0-9]+$ ]]; then
  weigh_functions | filter_by_size "$1"
else
  weigh_functions
fi

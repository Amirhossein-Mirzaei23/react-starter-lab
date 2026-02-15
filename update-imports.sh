#!/bin/bash

# Script to update import paths in the restructured project

cd "$(dirname "$0")"

echo "Updating import paths..."

# Update store imports (stores -> store/slices)
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/stores\/|from '../store/slices/|g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/stores\/|from '../../store/slices/|g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/stores\/|from '../../../store/slices/|g" {} \;

# Update API/http service imports
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/http|from '../../services/http|g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/api\/http|from '../services/http|g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/api\/http|from '../../../services/http|g" {} \;

# Update layout imports
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/layouts\/|from '../components/layout/|g" {} \;
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/layouts\/|from '../../components/layout/|g" {} \;

echo "Import path updates completed!"
echo "Please review the changes and test the application."

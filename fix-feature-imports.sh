#!/bin/bash

# Script to fix feature API imports

cd "$(dirname "$0")"

echo "Fixing feature API imports..."

# Fix imports within features (../../api/FEATURE/ -> ../api/)
# Auth feature
find src/features/auth -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/authentication\/|from '../api/|g" {} \;

# Bills feature
find src/features/bills -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/bills\/|from '../api/|g" {} \;

# Friends feature
find src/features/friends -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/friends\/|from '../api/|g" {} \;

# Groups feature
find src/features/groups -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/groups\/|from '../api/|g" {} \;

# Posts feature
find src/features/posts -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/posts\/|from '../api/|g" {} \;
find src/features/posts -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/post-detail\/|from '../api/post-detail/|g" {} \;

# Profile feature  
find src/features/profile -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/users\/|from '../api/|g" {} \;

# Fix cross-feature API imports (../../api/OTHER_FEATURE/ -> ../../OTHER_FEATURE/api/)
# Users API imports from other features
find src/features -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/users\/|from '../../users/api/|g" {} \;

# Friends API imports from other features (that weren't already fixed)
find src/features -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/friends\/|from '../../friends/api/|g" {} \;

# Groups API imports from other features (that weren't already fixed)
find src/features -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/api\/groups\/|from '../../groups/api/|g" {} \;

# Fix API imports in hooks and utils (../api/FEATURE/ -> ../features/FEATURE/api/)
find src/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/api\/authentication\/|from '../features/auth/api/|g" {} \;
find src/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/api\/friends\/|from '../features/friends/api/|g" {} \;
find src/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/api\/groups\/|from '../features/groups/api/|g" {} \;
find src/hooks -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/api\/users\/|from '../features/users/api/|g" {} \;

find src/utils -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/api\/notification\/|from '../features/notifications/api/|g" {} \;

echo "Feature API import fixes completed!"

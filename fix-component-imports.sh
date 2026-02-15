#!/bin/bash

# Script to fix component imports within features

cd "$(dirname "$0")"

echo "Fixing component imports within features..."

# Friends feature - pages importing from components
sed -i "s|from '../../components/friendship-requests/|from '../components/friendship-requests/|g" src/features/friends/friendShip/requests.tsx
sed -i "s|from '../../components/friends-container/|from '../components/|g" src/features/friends/friendShip/list.tsx

# Groups feature - pages importing from components  
sed -i "s|from '../../components/groups/|from '../components/|g" src/features/groups/groups/list.tsx
sed -i "s|from '../../components/groups/|from '../components/|g" src/features/groups/groups/detail.tsx

# Profile feature cross-import fix (friends importing profile components)
sed -i "s|from '../../components/profile/|from '../../profile/components/|g" src/features/friends/friendShip/list.tsx

# Fix any remaining ../../components/ to ../../shared-components
find src/features -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/components\/ui\/|from '../../../components/ui/|g" {} \;
find src/features -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/\.\.\/components\/ui\/|from '../../../../components/ui/|g" {} \;
find src/features -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "s|from ['\"]\.\.\/\.\.\/components\/layout\/|from '../../../components/layout/|g" {} \;

echo "Component import fixes completed!"

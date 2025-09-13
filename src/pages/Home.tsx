import { Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import FinancePreviewTable from '../components/finance-preview-table';
export default function Home() {
  return (
    <div>
      <FinancePreviewTable />
    </div>
  );
}

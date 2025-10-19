import { Box, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/navigationBar';
import FinancePreviewTable from '../components/finance-preview-table';
import BottomSheet from '../components/ui/base-bottom-sheet';
export default function Home() {
  return (
    <div>
      <FinancePreviewTable />
        <Box p={4}>
        <BottomSheet
          triggerButtonText="login"
          title="Custom Content Sheet"
          bodyContent={
             <Box>
              <Button colorScheme="green">Done</Button>
            </Box>
          }
          footer={
            <Box>
              <Button colorScheme="green">Done</Button>
            </Box>
          }
          triggerButtonProps={{ size: 'lg' }}
        />
      </Box>
    </div>
  );
}

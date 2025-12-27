import { create } from 'zustand';

// Define the shape of each item in the data array (example)
interface Draft {
  id: number;
  title: string;
  amount: number;
  // Add other properties as needed
}

interface draftState {
  count: number;
  data: Draft[]; // Specific type instead of any[]
  setData: (newData: Draft[]) => void; // Accept an array as parameter
}

const useDraftsFinancialStore = create<draftState>((set) => ({
  count: 0,
  data: [], // Initial empty array
  setData: (newData) => set({ data: newData }), // Update data with new array
}));

export default useDraftsFinancialStore;

//  const useStore = create(
//   persist(
//     (set) => ({
//       count: 0,
//       increment: () => set((state) => ({ count: state.count + 1 })),
//     }),
//     {
//       name: 'counter-storage', // نام کلید در localStorage
//     }
//   )
// );

// const useStore = create((set) => ({
//   data: null,
//   loading: false,
//   fetchData: async () => {
//     set({ loading: true });
//     const response = await fetch('https://api.example.com/data');
//     const data = await response.json();
//     set({ data, loading: false });
//   },
// }));

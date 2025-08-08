import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AssetData {
  name: string;
  type: 'stock' | 'bond' | 'cash';
  yield: number;
  allocation: number;
}

export interface PortfolioState {
  initialCapital: number;
  goalAmount: number;
  investorType: 'active' | 'passive' | '';
  assets: AssetData[];
  totalReturn: number;
  goalMet: boolean;
  setInitialCapital: (amount: number) => void;
  setGoalAmount: (amount: number) => void;
  setInvestorType: (type: 'active' | 'passive') => void;
  calculatePortfolio: () => void;
  reset: () => void;
}

const defaultAssets: AssetData[] = [
  { name: 'EthioTelecom', type: 'stock', yield: 20, allocation: 0 },
  { name: 'Ethiopian Government Bond', type: 'bond', yield: 10, allocation: 0 },
  { name: 'BIRR Cash', type: 'cash', yield: 7, allocation: 0 }
];

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      initialCapital: 0,
      goalAmount: 0,
      investorType: '',
      assets: defaultAssets,
      totalReturn: 0,
      goalMet: false,
      
      setInitialCapital: (amount) => set({ initialCapital: amount }),
      setGoalAmount: (amount) => set({ goalAmount: amount }),
      setInvestorType: (type) => set({ investorType: type }),
      
      calculatePortfolio: () => {
        const { initialCapital, investorType } = get();
        let updatedAssets: AssetData[] = [...defaultAssets];
        
        if (investorType === 'active') {
          // Active: at least 50% in stocks
          updatedAssets[0].allocation = 60; // Stock
          updatedAssets[1].allocation = 30; // Bond
          updatedAssets[2].allocation = 10; // Cash
        } else if (investorType === 'passive') {
          // Passive: at least 50% in bonds/cash
          updatedAssets[0].allocation = 30; // Stock
          updatedAssets[1].allocation = 50; // Bond
          updatedAssets[2].allocation = 20; // Cash
        }
        
        const totalReturn = updatedAssets.reduce((sum, asset) => {
          const allocation = (asset.allocation / 100) * initialCapital;
          return sum + (allocation * asset.yield / 100);
        }, 0);
        
        const finalAmount = initialCapital + totalReturn;
        const goalMet = finalAmount >= get().goalAmount;
        
        set({
          assets: updatedAssets,
          totalReturn,
          goalMet
        });
      },
      
      reset: () => set({
        initialCapital: 0,
        goalAmount: 0,
        investorType: '',
        assets: defaultAssets,
        totalReturn: 0,
        goalMet: false
      })
    }),
    {
      name: 'portfolio-storage'
    }
  )
);
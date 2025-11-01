import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

type PricingDetailsComponentProps = {
  title: string;
  price: string;
  desc?: string;
  withBorder?: boolean;
  borderRadius?: boolean;
  isHidden?: boolean;
};

type PricingCardType = {
  cardTitle: string;
  details: PricingDetailsComponentProps[];
  isTwoItem?: boolean;
};

type PropertyType = {
  title: string;
  price: number;
  details: PricingCardType[];
};

type PricingState = {
  properties: Record<string, PropertyType>;
  selectedPropertyId: string | null;
  loading: boolean;
};

const initialState: PricingState = {
  properties: {},
  selectedPropertyId: null,
  loading: true,
};

export const transformPropertyData = (propertyData: any) => {
  const additionalFees = propertyData.additionalFees || {};
  const monthlyCosts = propertyData.monthlyCosts || {};
  const monthlyExpenses = propertyData.monthlyExpenses || {};
  const totalInitialCosts = propertyData.totalInitialCosts || {};

  return {
    title: propertyData.title,
    price: propertyData.price,
    details: [
      {
        cardTitle: "Additional Fees",
        details: [
          {
            title: "Property Transfer Tax",
            price: `$${additionalFees.transferTax || 0}`,
            desc: "Based on the sale price and local regulations"
          },
          {
            title: "Legal Fees",
            price: `$${additionalFees.legalFees || 0}`,
            desc: "Approximate cost for legal services, including title transferr",
            withBorder: true
          },
          {
            title: "Home Inspection",
            price: `$${additionalFees.inspection || 0}`,
            desc: "Recommended for due diligence",
            borderRadius: true,
          },
          {
            title: "Property Insurance",
            price: `$${additionalFees.insurance || 0}`,
            desc: "Annual cost for comprehensive property insurance",
            withBorder: true
          },
          {
            title: "Mortgage Fees",
            price: "Varies",
            desc: "If applicable, consult with your lender for specific details"
          },
        ],
      },
      {
        cardTitle: "Monthly Costs",
        details: [
          {
            title: "Property Taxes",
            price: `$${monthlyCosts.propertyTaxes || 0}`,
            desc: "Approximate monthly property tax based on the sale price and local rates"
          },
          {
            title: "Homeowners' Association Fee",
            price: `$${monthlyCosts.hoa || 0}`,
            desc: "Monthly fee for common area maintenance and security"
          },
        ],
      },
      {
        cardTitle: "Total Initial Costs",
        details: [
          {
            title: "Listing Price",
            price: `$${totalInitialCosts.listingPrice || 0}`
          },
          {
            title: "Additional Fees",
            price: `$${totalInitialCosts.additionalFees || 0}`,
            desc: "Property transfer tax, legal fees, inspection, insurance",
            withBorder: true
          },
          {
            title: "Down Payment",
            price: `$${totalInitialCosts.downPayment || 0}`,
            desc: "20%",
            borderRadius: true,
          },
          {
            title: "Mortgage Amount",
            price: `$${totalInitialCosts.mortgageAmount || 0}`,
            desc: "If applicable",
            withBorder: true,
            borderRadius: true,
          },
        ],
      },
      {
        cardTitle: "Monthly Expenses",
        details: [
          {
            title: "Property Taxes",
            price: `$${monthlyExpenses.propertyTaxes || 0}`
          },
          {
            title: "Homeowners' Association Fee",
            price: `$${monthlyExpenses.hoa || 0}`,
            withBorder: true
          },
          {
            title: "Mortgage Payment",
            price: "Varies based on terms and interest rate",
            desc: "If applicable",
            isHidden: true,
          },
          {
            title: "Property Insurance",
            price: `$${monthlyExpenses.insurance || 0}`,
            desc: "Approximate monthly cost",
            withBorder: true,
            borderRadius: true
          },
        ],
      },
    ],
  };
};


const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setPricing: (state, action) => {
      state.properties = action.payload.properties;
      state.selectedPropertyId = action.payload.selectedPropertyId;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedPropertyId: (state, action) => {
      state.selectedPropertyId = action.payload;
    },
  },
});

export const { setPricing, setLoading, setSelectedPropertyId } = pricingSlice.actions;
export default pricingSlice.reducer;

// thunk for get data
export const subscribePricing = () => (dispatch: any) => {
  dispatch(setLoading(true));

  const pricingRef = ref(db, "properties");

  onValue(pricingRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const transformed: Record<string, PropertyType> = {};

      Object.entries(data).forEach(([id, propertyData]) => {
        transformed[id] = transformPropertyData(propertyData);
      });

      const firstPropertyId = Object.keys(transformed)[0] || null;

      dispatch(
        setPricing({
          properties: transformed,
          selectedPropertyId: firstPropertyId,
        })
      );
    } else {
      dispatch(setPricing({ properties: {}, selectedPropertyId: null }));
    }
  });
};

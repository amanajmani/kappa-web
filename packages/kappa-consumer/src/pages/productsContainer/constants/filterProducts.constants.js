const FILTER_PRODUCTS = {
  SORT: [
    {label: 'Newest', type: 'sort', value: '-createdAt'},
    {label: 'Oldest', type: 'sort', value: '-createdAt'},
    {label: 'Price: Low-High', type: 'sort', value: 'price'},
    {label: 'Price: High-Low', type: 'sort', value: '-price'},
  ],
  PRICE: [
    {label: '0 - $100', type: 'price', value: { min: 0, max: 100 }},
    {label: '$100 - $250', type: 'price', value: { min: 100, max: 250 }},
    {label: '$250 - $400', type: 'price', value: { min: 250, max: 400 }},
    {label: '$400 - $650', type: 'price', value: { min: 400, max: 650 }},
    {label: '$650 and above', type: 'price', value: { min: 650, max: 10000 }},
  ],
  DISCOUNT: [
    {label: '10% and above', type: 'discount', value: 10 },
    {label: '25% and above', type: 'discount', value: 25 },
    {label: '35% and above', type: 'discount', value: 35 },
    {label: '45% and above', type: 'discount', value: 45 },
    {label: '55% and above', type: 'discount', value: 55 },
    {label: '65% and above', type: 'discount', value: 65 },
    {label: '75% and above', type: 'discount', value: 75 },
  ]
};

export default FILTER_PRODUCTS;

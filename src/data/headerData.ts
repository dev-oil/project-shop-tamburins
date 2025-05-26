export type SubCategory = {
  name: string;
  label: string;
  image: string;
};

export type Category = {
  label: string;
  subCategories: SubCategory[];
};

export const gnbCategories: Category[] = [
  {
    label: 'BOTTARI',
    subCategories: [
      {
        name: 'bottari',
        label: '보타리',
        image: '/images/header/category_bottari_edit.jpg',
      },
    ],
  },
  {
    label: 'PERFUME',
    subCategories: [
      {
        name: 'perfume',
        label: '퍼퓸',
        image: '/images/header/category_perfume_bottari.jpg',
      },
      {
        name: 'perfume-oil',
        label: '퍼퓸 오일',
        image: '/images/header/category_oil_bottari.jpg',
      },
      {
        name: 'perfume-balm',
        label: '퍼퓸 밤',
        image: '/images/header/category_balm_bottari.jpg',
      },
    ],
  },
  {
    label: 'HAND&LIP',
    subCategories: [
      {
        name: 'shell-perfume-hand',
        label: '쉘 퍼퓸 핸드',
        image: '/images/header/category_perfume_hand.jpg',
      },
      {
        name: 'egg-lip',
        label: '에그 립밤',
        image: '/images/header/category_lipBalm.jpg',
      },
      {
        name: 'chain-hand',
        label: '체인 핸드',
        image: '/images/header/category_chain.jpg',
      },
    ],
  },
  {
    label: 'BODY',
    subCategories: [
      {
        name: 'showery-body',
        label: '샤워리바디',
        image: '/images/header/category_shwry.jpg',
      },
      {
        name: 'perfumed-hand',
        label: '퍼퓸드 핸드앤바디',
        image: '/images/header/category_perfume_hand.jpg',
      },
    ],
  },
  {
    label: 'HOME FRAGRANCE',
    subCategories: [
      {
        name: 'car-diffuser',
        label: '카 디퓨저',
        image: '/images/header/category_car_fin.jpg',
      },
      {
        name: 'room-fragrance',
        label: '룸 프래그런스',
        image: '/images/header/category_room.jpg',
      },
      {
        name: 'perfume-candle',
        label: '퍼퓸 캔들',
        image: '/images/header/category_candle.jpg',
      },
    ],
  },
];

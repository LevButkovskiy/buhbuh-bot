const bars1 = [
    {
        title: 'Oversize pizza club',
        address: 'Гражданская улица 13-15',
        latitude: 59.928158,
        longitude: 30.312481
    },
    {
        title: 'El Copitas Bar',
        address: 'Колокольная 2/18',
        latitude: 59.929033,
        longitude: 30.348764
    },
    {
        title: 'Paloma Cantina',
        address: 'Садовая ул. 8/7',
        latitude: 59.937008,
        longitude: 30.336592
    },
    {
        title: 'Krang pizza',
        address: 'Гороховая 28',
        latitude: 59.929984,
        longitude: 30.320189
    },
    {
        title: 'Chuck',
        address: 'Гороховая 41',
        latitude: 59.928821,
        longitude: 30.321177
    },
    {
        title: 'Bar 812',
        address: 'Жуковского 11',
        latitude: 59.935755,
        longitude: 30.352115
    },
    {
        title: 'Barquinta',
        address: 'Жуковского 7-9',
        latitude: 59.935773,
        longitude: 30.351540
    }
];


const bars2 = [
    {
        title: 'Commod',
        address: 'Рубинштейна 1',
        latitide: 59.932441,
        longitude: 30.345683
    },
    {
        title: 'УЕБар',
        address: 'ул Восстания 12',
        latitide: 59.936251,
        longitude: 30.360029
    },
    {
        title: 'Пробирка',
        address: 'ул Ломоносова 2',
        latitide: 59.932558,
        longitude: 30.326917
    },
    {
        title: '«Хроники»',
        address: 'пл. Восстания, 24',
        latitide: 59.931017,
        longitude: 30.361467
    },
    {
        title: 'Бар Dead Poets',
        address: 'ул. Жуковского, 12',
        latitide: 59.936124,
        longitude: 30.353373
    },
    {
        title: 'Union',
        address: 'Литейный пр., 55',
        latitide: 59.935674,
        longitude: 30.347731
    },
    {
        title: '«Терминал»',
        address: 'ул. Белинского, 11',
        latitide: 59.938076,
        longitude: 30.347022
    },
];

const bars3 = [
    {
        title: 'Cocos Lounge Bar',
        address: 'Лиговский Проспект 10',
        latitude: 59.932689,
        longitude: 30.362634
    },
    {
        title: 'Black Heart Bar',
        address: 'на Гороховой',
        latitude: 59.929155,
        longitude: 30.321069
    },
    {
        title: '4 Head’s Bar',
        address: 'на Ропшинской улице',
        latitude: 59.958976,
        longitude: 30.294470
    },
    {
        title: 'Mr. Toad',
        address: 'на Коломенской улице',
        latitude: 59.923157,
        longitude: 30.353112
    },
    {
        title: 'Xander Bar',
        address: 'отель Four Seasons, Адмиралтейская',
        latitude: 59.935095,
        longitude: 30.307292
    },
]

const bars4 = [
    {
        title: 'The Hat',
        address: 'ул. Белинского, 9',
        latitude: 59.938090,
        longitide: 30.346599
    },
    {
        title: '«Продукты»',
        address: 'наб. Фонтанки, 17',
        latitude: 59.935858,
        longitide: 30.343186
    },
    {
        title: 'Mishka Bar',
        address: 'наб. Фонтанки, 40',
        latitude: 59.933713,
        longitide: 30.344623
    },
    {
        title: '«Цветочки»',
        address: 'ул. Рубинштейна, 23',
        latitude: 59.927996,
        longitide: 30.343060
    },
    {
        title: 'Mitte',
        address: 'ул. Рубинштейна, 27',
        latitude: 59.927175,
        longitide: 30.342593
    },
    {
        title: 'Wood Bar',
        address: 'ул. Марата, 34',
        latitude: 59.926021,
        longitide: 30.352510
    },
    {
        title: 'Zing',
        address: 'ул. Ломоносова, 14',
        latitude: 59.927878,
        longitide: 30.338479
    },
    {
        title: 'Poison',
        address: 'ул. Думская, 9',
        latitude: 59.932779,
        longitide: 30.327322
    },
    {
        title: 'Kopen',
        address: 'Конюшенная пл., 2',
        latitude: 59.940709,
        longitide: 30.325992
    },
]

const routes = [
    {
        name: 'Персональный 1',
        bars: bars1,
        tags: ['персональный', 'личный', 'второй', '2', '2.', '2.персональный', '2. персональный']
    },
    {
        name: 'Персональный 2',
        bars: bars2,
        tags: ['персональный', 'личный', 'второй', '2', '2.', '2.персональный', '2. персональный']
    },
    {
        name: 'Персональный 3',
        bars: bars3,
        tags: ['персональный', 'личный', 'второй', '2', '2.', '2.персональный', '2. персональный']
    },
    {
        name: 'Маршрут "Поперечного"',
        bars: bars4,
        tags: ['поперечный', 'поперечного', 'дани поперечного', 'первый', '1', '1.', '1.маршрут "поперечного"', '1. поперечного', 'маршрут поперечного']
    }
]

export {
    bars1,
    bars2,
    bars3,
    bars4,
    routes
}

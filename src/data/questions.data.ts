export interface LocalizedContent {
    question: string;
    options: string[];
}

export interface Question {
    id: number;
    content: {
        uz: LocalizedContent;
        ru: LocalizedContent;
        en: LocalizedContent;
    };
    answer: number; // index of the correct option
    image?: string;
}

export const questions: Question[] = [
    {
        id: 1,
        content: {
            uz: {
                question: "Chorrahada qaysi transport vositasi birinchi bo'lib harakatlanadi?",
                options: ["Yengil avtomobil", "Yuk avtomobili", "Tramvay", "Velosiped"]
            },
            ru: {
                question: "Какое транспортное средство проедет перекресток первым?",
                options: ["Легковой автомобиль", "Грузовик", "Трамвай", "Велосипед"]
            },
            en: {
                question: "Which vehicle moves first at the intersection?",
                options: ["Car", "Truck", "Tram", "Bicycle"]
            }
        },
        answer: 2,
        image: "/images/intersection_roundabout.png"
    },
    {
        id: 2,
        content: {
            uz: {
                question: "Ushbu belgi nima anglatadi?",
                options: ["To'xtash taqiqlanadi", "Kirish taqiqlanadi", "Asosiy yol", "Xavfli burilish"]
            },
            ru: {
                question: "Что означает этот знак?",
                options: ["Остановка запрещена", "Въезд запрещен", "Главная дорога", "Опасный поворот"]
            },
            en: {
                question: "What does this sign mean?",
                options: ["No stopping", "No entry", "Main road", "Dangerous turn"]
            }
        },
        answer: 1,
        image: "/images/sign_no_stopping.svg"
    },
    {
        id: 3,
        content: {
            uz: {
                question: "Svetaforning qizil chirog'i yonganda nima qilish kerak?",
                options: ["Harakatlanishni davom ettirish", "To'xtash", "Sekinlashish", "Signal berish"]
            },
            ru: {
                question: "Что делать, когда горит красный свет светофора?",
                options: ["Продолжать движение", "Остановиться", "Замедлиться", "Подать сигнал"]
            },
            en: {
                question: "What to do when the traffic light is red?",
                options: ["Continue moving", "Stop", "Slow down", "Honk"]
            }
        },
        answer: 1,
        image: "/images/traffic_light_red.png"
    },
    {
        id: 4,
        content: {
            uz: {
                question: "Magistral yo'lda ruxsat etilgan maksimal tezlik qancha?",
                options: ["90 km/soat", "100 km/soat", "110 km/soat", "70 km/soat"]
            },
            ru: {
                question: "Какова максимально допустимая скорость на автомагистрали?",
                options: ["90 км/ч", "100 км/ч", "110 км/ч", "70 км/ч"]
            },
            en: {
                question: "What is the maximum speed limit on the highway?",
                options: ["90 km/h", "100 km/h", "110 km/h", "70 km/h"]
            }
        },
        answer: 2,
        image: "/images/sign_speed_110.png"
    },
    {
        id: 5,
        content: {
            uz: {
                question: "Yo'l harakati qoidalari bo'yicha 'svetofor' ishoralari nechta?",
                options: ["2 ta", "3 ta", "4 ta", "5 ta"]
            },
            ru: {
                question: "Сколько сигналов у светофора согласно правилам дорожного движения?",
                options: ["2", "3", "4", "5"]
            },
            en: {
                question: "How many signals does a traffic light have?",
                options: ["2", "3", "4", "5"]
            }
        },
        answer: 1,
        image: "/images/traffic_light_full.png"
    },
    {
        id: 6,
        content: {
            uz: {
                question: "Ushbu belgi nimani bildiradi?",
                options: ["Piyodalar o'tish joyi", "Bolalar", "Hayvonlar", "Ta'mirlash ishlari"]
            },
            ru: {
                question: "Что означает этот знак?",
                options: ["Пешеходный переход", "Дети", "Животные", "Дорожные работы"]
            },
            en: {
                question: "What does this sign mean?",
                options: ["Pedestrian crossing", "Children", "Animals", "Road works"]
            }
        },
        answer: 1,
        image: "/images/sign_children.png"
    },
    {
        id: 7,
        content: {
            uz: {
                question: "Qaysi holatda haydovchi xavfsizlik kamarini taqmasligi mumkin?",
                options: ["Hech qanday holatda", "Faol haydashda", "Orqaga harakatlanganda", "Kechasi"]
            },
            ru: {
                question: "В каком случае водитель может не пристегиваться ремнем безопасности?",
                options: ["Ни в каком", "При активной езде", "При движении задним ходом", "Ночью"]
            },
            en: {
                question: "When can a driver not wear a seatbelt?",
                options: ["Never", "Active driving", "Reversing", "At night"]
            }
        },
        answer: 2,
        image: "/images/seatbelt_usage.svg"
    },
    {
        id: 8,
        content: {
            uz: {
                question: "Aholi punktlarida ruxsat etilgan maksimal tezlik qancha (yangi qoida)?",
                options: ["70 km/soat", "60 km/soat", "50 km/soat", "100 km/soat"]
            },
            ru: {
                question: "Какова максимально допустимая скорость в населенных пунктах (новое правило)?",
                options: ["70 км/ч", "60 км/ч", "50 км/ч", "100 км/ч"]
            },
            en: {
                question: "What is the maximum speed limit in residential areas (new rule)?",
                options: ["70 km/h", "60 km/h", "50 km/h", "100 km/h"]
            }
        },
        answer: 1,
        image: "/images/sign_speed_60.svg"
    },
    {
        id: 9,
        content: {
            uz: {
                question: "Ushbu belgi qanday ma'noni anglatadi?",
                options: ["To'xtash", "Yo'l bering", "Bosh yo'l", "Boshib o'tish taqiqlanadi"]
            },
            ru: {
                question: "Что означает этот знак?",
                options: ["Стоп", "Уступите дорогу", "Главная дорога", "Обгон запрещен"]
            },
            en: {
                question: "What does this sign mean?",
                options: ["Stop", "Yield", "Main road", "No overtaking"]
            }
        },
        answer: 1,
        image: "/images/sign_yield.svg"
    },
    {
        id: 10,
        content: {
            uz: {
                question: "Sutkaning qorong'u vaqtida va yetarlicha ko'rinmaydigan sharoitda...",
                options: ["Chiroqlarni yoqish shart", "Signal berish kerak", "Tezlikni oshirish kerak", "Hech narsa qilish shart emas"]
            },
            ru: {
                question: "В темное время суток и в условиях недостаточной видимости...",
                options: ["Нужно включить фары", "Нужно сигналить", "Нужно увеличить скорость", "Ничего не нужно делать"]
            },
            en: {
                question: "In the dark and in poor visibility conditions...",
                options: ["Must turn on lights", "Must honk", "Must increase speed", "Do nothing"]
            }
        },
        answer: 0,
        image: "/images/night_driving.svg"
    },
    {
        id: 11,
        content: {
            uz: {
                question: "Bunda qaysi transport vositasi o'tish huquqiga ega?",
                options: ["Avtobus", "Yengil avtomobil", "Ikkalasi bir vaqtda", "Hech qaysisi"]
            },
            ru: {
                question: "Какое транспортное средство имеет право проезда?",
                options: ["Автобус", "Легковой автомобиль", "Оба одновременно", "Никто"]
            },
            en: {
                question: "Which vehicle has the right of way?",
                options: ["Bus", "Car", "Both at same time", "Neither"]
            }
        },
        answer: 1,
        image: "/images/intersection_priority_complex.png"
    },
    {
        id: 12,
        content: {
            uz: {
                question: "Ushbu belgi nimani bildiradi?",
                options: ["Harakatlanish taqiqlanadi", "To'xtash taqiqlanadi", "Kirish taqiqlanadi", "Tezlik cheklangan"]
            },
            ru: {
                question: "Что означает этот знак?",
                options: ["Движение запрещено", "Остановка запрещена", "Въезд запрещен", "Ограничение скорости"]
            },
            en: {
                question: "What does this sign mean?",
                options: ["No traffic", "No stopping", "No entry", "Speed limit"]
            }
        },
        answer: 2,
        image: "/images/sign_no_entry.svg"
    },
    {
        id: 13,
        content: {
            uz: {
                question: "Yo'l harakati qatnashchilariga kimlar kiradi?",
                options: ["Faqat haydovchilar", "Haydovchilar va piyodalar", "Faqat yo'lovchilar", "Barcha sanab o'tilganlar"]
            },
            ru: {
                question: "Кто входит в число участников дорожного движения?",
                options: ["Только водители", "Водители и пешеходы", "Только пассажиры", "Все перечисленные"]
            },
            en: {
                question: "Who are road users?",
                options: ["Drivers only", "Drivers and pedestrians", "Passengers only", "All of the above"]
            }
        },
        answer: 3,
        image: "/images/road_users.svg"
    },
    {
        id: 14,
        content: {
            uz: {
                question: "Majburiy to'xtash nima?",
                options: ["Svetofor qizil bo'lganda to'xtash", "Texnik nosozlik tufayli to'xtash", "Yo'lovchi tushirish uchun to'xtash", "Dam olish uchun to'xtash"]
            },
            ru: {
                question: "Что такое вынужденная остановка?",
                options: ["Остановка на красный свет", "Остановка из-за неисправности", "Остановка для высадки", "Остановка для отдыха"]
            },
            en: {
                question: "What is a forced stop?",
                options: ["Stopping at red light", "Stopping due to malfunction", "Stopping to drop passenger", "Stopping to rest"]
            }
        },
        answer: 1,
        image: "/images/forced_stop_triangle.svg"
    },
    {
        id: 15,
        content: {
            uz: {
                question: "Qizil chiroq yonganda...",
                options: ["Harakatni davom ettirish mumkin", "O'ngga burilish mumkin (agar belgi bo'lsa)", "To'xtash shart emas", "Tezlikni oshirish kerak"]
            },
            ru: {
                question: "Когда горит красный свет...",
                options: ["Можно продолжать движение", "Можно повернуть направо (если есть знак)", "Не нужно останавливаться", "Нужно ускориться"]
            },
            en: {
                question: "When the red light is on...",
                options: ["Can continue", "Can turn right (if allowed)", "No need to stop", "Must speed up"]
            }
        },
        answer: 1,
        image: "/images/traffic_light_red_arrow.svg"
    },
    {
        id: 16,
        content: {
            uz: {
                question: "Ushbu belgi nima?",
                options: ["Temir yo'l kesishmasi", "Avtomagistral", "Turar joy dahasi", "Aylanma harakat"]
            },
            ru: {
                question: "Что это за знак?",
                options: ["Ж/Д переезд", "Автомагистраль", "Жилая зона", "Круговое движение"]
            },
            en: {
                question: "What is this sign?",
                options: ["Level crossing", "Motorway", "Residential area", "Roundabout"]
            }
        },
        answer: 0,
        image: "/images/sign_railway_crossing.png"
    },
    {
        id: 17,
        content: {
            uz: {
                question: "Chorrahada kim ustunlikka ega?",
                options: ["O'ng tomondan kelayotgan", "Chap tomondan kelayotgan", "Tezroq kelgan", "Katta mashina"]
            },
            ru: {
                question: "Кто имеет преимущество на равнозначном перекрестке?",
                options: ["Помеха справа", "Помеха слева", "Кто быстрее", "Большая машина"]
            },
            en: {
                question: "Who has priority at an unregulated intersection?",
                options: ["Vehicle from right", "Vehicle from left", "Faster one", "Bigger car"]
            }
        },
        answer: 0,
        image: "/images/intersection_priority_direction.jpg"
    },
    {
        id: 18,
        content: {
            uz: {
                question: "Qaysi holatda orqaga qayrilib olish taqiqlanadi?",
                options: ["Ko'prik ustida", "Keng yo'lda", "Bo'sh joyda", "Chorrahada"]
            },
            ru: {
                question: "Где запрещен разворот?",
                options: ["На мосту", "На широкой дороге", "На пустом месте", "На перекрестке"]
            },
            en: {
                question: "Where is U-turn prohibited?",
                options: ["On a bridge", "On wide road", "In empty space", "At intersection"]
            }
        },
        answer: 0,
        image: "/images/sign_no_uturn_real.jpg"
    },
    {
        id: 19,
        content: {
            uz: {
                question: "Transport vositasini kim boshqarishi mumkin?",
                options: ["Guvohnomasi bor shaxs", "18 yoshga to'lgan shaxs", "Mashinani hayday oladigan har kim", "Pasporti bor shaxs"]
            },
            ru: {
                question: "Кто может управлять транспортным средством?",
                options: ["Лицо с правами", "Лицо старше 18", "Любой умеющий", "Лицо с паспортом"]
            },
            en: {
                question: "Who can drive a vehicle?",
                options: ["Person with license", "Person over 18", "Anyone who can drive", "Person with passport"]
            }
        },
        answer: 0,
        image: "/images/license_icon.svg"
    },
    {
        id: 20,
        content: {
            uz: {
                question: "Piyodalar o'tish joyida...",
                options: ["Piyodaga yo'l berish shart", "Signal berish kerak", "Tez o'tib ketish kerak", "To'xtash mumkin emas"]
            },
            ru: {
                question: "На пешеходном переходе...",
                options: ["Нужно уступить пешеходу", "Нужно сигналить", "Нужно быстро проехать", "Нельзя останавливаться"]
            },
            en: {
                question: "At a pedestrian crossing...",
                options: ["Must yield to pedestrian", "Must honk", "Must pass quickly", "Cannot stop"]
            }
        },
        answer: 0,
        image: "/images/pedestrian_crossing.svg"
    }
];

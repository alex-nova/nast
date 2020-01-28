/* eslint-disable max-len */

export default {
  users: [
    { id: 1, companyId: 1, fullName: 'Боранбаев Мақсат Серікұлы', iin: '123456789012', email: 'admin@site.com', phone: '+77872329931', position: 'Проектировщик', isAdmin: true, },
    { id: 2, companyId: 1, fullName: 'Гарматюк Игорь Васильевич', iin: '650514300237', email: 'igor.g@site.com', phone: '+72378283232', position: 'Строитель', isAdmin: false, },
    { id: 3, companyId: 1, fullName: 'Гаркушкин Михаил Иванович', iin: '960740002048', email: 'michael.g@site.com', phone: '+78229010232', position: 'Мастер', isAdmin: true, },
    { id: 4, companyId: 1, fullName: 'Осипов Владимир Николаевич', iin: '780905300615', email: 'vladimir.o@site.com', phone: '+77973239423', position: 'Сварщик', isAdmin: false, },
    { id: 5, companyId: 1, fullName: 'Иванов Николай Николаевич', iin: '090240011068', email: 'nikolai.i@site.com', phone: '+72394772188', position: 'Проектировщик', isAdmin: false, },
    { id: 6, companyId: 1, fullName: 'Акижанов Дархан Амиргалыевич', iin: '120640019581', email: 'darhan.a@site.com', phone: '+77378280988', position: 'Сварщик', isAdmin: false, },
    { id: 7, companyId: 1, fullName: 'Комбатуров Сагандык Толегенович', iin: '600501351132', email: 'sagandyk.k@site.com', phone: '+77732378833', position: 'Прораб', isAdmin: false, },
  ],
  companies: [
    { id: 1, name: 'ТОО "LIA-PROD"', bin: '041140009373', description: 'Строительная компания', address: 'Толе Би 62, 308', },
  ],
  projects: [
    { id: 1, name: 'ЖК "Иван 1"', address: 'Жамбыла 114a', user: 'Боранбаев Мақсат Серікұлы', description: 'Строительство Жилого комплекса "Иван"', startedAt: '30.10.2018', endedAt: '31.10.2019', },
    { id: 2, name: 'ЖК "Иван 2"', address: 'Жамбыла 114b', user: 'Гарматюк Игорь Васильевич', description: 'Строительство Жилого комплекса "Иван"', startedAt: '30.10.2018', endedAt: '31.10.2019', },
    { id: 3, name: 'ЖК "Иван 3"', address: 'Жамбыла 114c', user: 'Иванов Иван Иванович', description: 'BlackBerry Hills – таунхаусы бизнес-класса, расположенные ' +
        'в элитном районе, в 10 минутах от центра города. Это спокойный и экологически чистый район, в котором Вы сможете насладиться тишиной, свежим воздухом и приятными прогулками,' +
        ' не выезжая за пределы города. Прежде чем приступить к строительству, мы кропотливо прорабатывали каждую деталь и тщательно продумывали каждое архитектурное решение. Наши дома ' +
        'наделены особенным характером, подчеркивающим исключительность будущих владельцев.', startedAt: '30.10.2018', endedAt: '31.10.2019', },
  ],
  objects: [
    { id: 1, projectId: 1, name: 'Блок 1"', address: 'Жамбыла 114a', user: 'Боранбаев Мақсат Серікұлы', description: 'Строительство Жилого комплекса "Иван"', startedAt: '30.10.2018', endedAt: '31.10.2019', },
    { id: 2, projectId: 1, name: 'Блок 2"', address: 'Жамбыла 114a', user: 'Боранбаев Мақсат Серікұлы', description: 'Строительство Жилого комплекса "Иван"', startedAt: '30.10.2018', endedAt: '31.10.2019', },
    { id: 3, projectId: 1, name: 'Блок 3"', address: 'Жамбыла 114a', user: 'Боранбаев Мақсат Серікұлы', description: 'Строительство Жилого комплекса "Иван"', startedAt: '30.10.2018', endedAt: '31.10.2019', },
  ],
  
  types: [
    { id: 1, name: 'Бетонные работы', },
    { id: 2, name: 'Сварка', },
  ],
  
  docs: [
    { id: 1, name: '', desc: 'Описание', file: '123', type: 3, },
    { id: 2, name: '', desc: 'Описание', file: '123', type: 2, },
    { id: 3, name: '', desc: 'Описание', file: '123', type: 4, },
  ],
  
  docs2: [
    { id: 1, name: 'Чертеж 1', desc: 'Описание', file: '123', object: 'Блок 1', type: 1, },
    { id: 2, name: 'Чертеж 2', desc: 'Описание', file: '123', object: 'Блок 1', type: 2, },
  ],
  
  materials: [
    { id: 1, name: 'Бетон', unit: 'м3', count: 10, desc: '', },
    { id: 2, name: 'Кирпичи', unit: 'т', count: 4, desc: '', },
    { id: 3, name: 'Балка', unit: 'шт', count: 12, desc: 'Описание балки', },
  ],
  works: [
    { id: 1, name: 'Заливка бетона', type: 1, object: 'Блок 1', units: 'м3', },
    { id: 2, name: 'Укладка кирпичей', type: 2, object: 'Блок 1', units: 'т', },
  ],
  
  journals: [
    { id: 1, object: { name: 'Блок 1', }, project: { name: 'ЖК «Восточка»', }, lastRecord: Date.now(), },
    { id: 2, object: { name: 'Блок 2', }, project: { name: 'ЖК «Восточка»', }, lastRecord: Date.now(), },
  ],
  records: [
    { id: 1, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '50', done: '', createdAt: Date.now(),
      content: 'Устройство гидроизоляции по бетонной подготовке ленточных ростверков фундаментов блока №4 в осях А/2-А/1-А/4 на отм. -4,200.', },
    { id: 2, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '34', done: '60м3', createdAt: Date.now(),
      content: 'Бетонирование столбчатых ростверков фундаментов блока №4', },
    { id: 3, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '35', done: '', createdAt: Date.now(),
      content: 'Армирование и монтаж опалубки столбчатых и ленточных ростверов фундаментов блока 4', },
    { id: 4, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '40', done: '', createdAt: Date.now(),
      content: 'Разработка грунта вручную под основание фундаментов блока №4 в осях Г-Д-8-9', },
    { id: 5, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '81', done: '100шт', createdAt: Date.now(),
      content: 'Забивка свай С-120.30-10 фундаментов блока №2', },
    { id: 6, weather: 'Пасмурно', temp: '+10/0', wind: 'СВ 8-10 м/с', percent: '48', done: '131 шт', createdAt: Date.now(),
      content: 'Срубка оголовков свай фундаментов блока №2 на отм -4,150', },
  ],
}

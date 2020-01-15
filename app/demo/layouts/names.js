
export default (type = 'emg') => {
  const content = {
    emg: {
      logo: 'EMG',
      logoMin: 'E',
      product: 'EMG Portal',
      company: '© 2017 - 2020 ICORE Software Development',
    },
    eq: {
      logo: 'E-Qurylys',
      logoMin: 'EQ',
      product: 'E-Qurylys 1.0',
      company: '© 2020 TOO "DCS инжиниринг"',
    },
  }
  
  return content[type]
}

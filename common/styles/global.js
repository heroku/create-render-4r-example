const values = {
  color: '#fff',
  bgColor: '#999'
};

export default {
  html: {
    width: '100%',
    height: '100%',
    margin: 0,
    fontSize: '100%',
    fontFamily: '-apple-system-body, "Helvetica Neue", san-serif'
  },
  mediaQueries: {
    '(min-width: 550px)': {
      html:  {
        fontSize: '120%'
      }
    },
    '(min-width: 1200px)': {
      html:  {
        fontSize: '140%'
      }
    }
  },

  'body, #react-app': {
    width: '100%',
    height: '100%',
    margin: 0,
    overflow: 'hidden',
    backgroundColor: values.bgColor,
    color: values.color
  },

  h1: {
    fontFamily: '-apple-system-headline, "Helvetica Neue", san-serif',
    fontSize: '16rem',
    margin: 0,
    padding: 0
  }
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "mob": {"max":"700px"}
    },

    extend: {
      
        
      animation: {
       'spin-slow': 'spin 10s linear infinite',
       'bounce-hard': 'bounce 0.5s linear infinite ',
      },
      minWidth:{
        "twoHpx":"200px"

      },
      maxWidth:{
        "twoHpx":"200px"

      },
      height:{
        "fullscreen":"100vh",
      },
      margin:{
        "1/5":"20%"
      },

      borderRadius: {
        'circular': '100%',


      },
      boxShadow: {
       'megashadow': '0 35px 60px 1px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: theme =>({
        "blue-white-split": "linear-gradient(to right, rgba(0, 0, 0,0), rgba(0, 0, 0,0) 50%,  rgba(30, 58, 138,1) 50%, rgba(30, 58, 138,1))"
      }),
      gridColumn: {
        'span-0': 'span 0 / span 0',
       },
       inset:{
        '1/5': '20%',
       },
       transitionProperty: {
         'color':'color, background-color',
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
        'spacing-width': 'margin, padding, width',
       }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

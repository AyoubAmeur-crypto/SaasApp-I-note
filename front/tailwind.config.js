/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {

      colors:{

        primary:{

          main:'#0B132B',
          second:'#171E35',
          yello:'#E6BB1F'
        }
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' }
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '100%' },
          '100%': { width: '100%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' }
        }
      },
      animation: {
        float: 'float 15s linear infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        progress: 'progress 1.5s ease-in-out infinite',
        slideUp: 'slideUp 0.3s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-in forwards'
      }
    }
  },
  plugins: [],
}


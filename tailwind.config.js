/**@type{import('tailwindcss').Config}*/
module.exports = {
    content:[
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
     extend: {
      colors:{
        'shadow-depth':'#2a3831',
        'lavender-mist':'#e6d7e6',
        'golden-spark':'#ffd700',
        'ethereal-blue':'#a3d4e5',
      },
 },
 },
plugins:[]
}

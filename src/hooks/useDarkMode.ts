import { useState, useEffect } from 'react';
export default function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme');
    if (saveTheme) {
      setDark(saveTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : '');
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return { dark, setDark, toggle };
}

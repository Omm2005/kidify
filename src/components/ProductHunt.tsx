'use client'

import { useTheme } from "next-themes";
import Link from "next/link";

interface ProductHuntProps {
  
}

const ProductHunt = ({} : ProductHuntProps) => {
    
  const { theme , systemTheme } = useTheme();
  return (
        <div>
        {
        theme === 'light' || systemTheme === 'light' ? (
          <Link href="https://www.producthunt.com/posts/kidify-it?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-kidify&#0045;it" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=445171&theme=light" alt="Kidify&#0045;it - Complex&#0032;topics&#0032;explained&#0032;like&#0032;you&#0032;are&#0032;5&#0032;years&#0032;old&#0046; | Product Hunt" style={{ width: '200px', height: '50px' }} width="200" height="50" /></Link>
        ) : (
          <Link href="https://www.producthunt.com/posts/kidify-it?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-kidify&#0045;it" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=445171&theme=dark" alt="Kidify&#0045;it - Complex&#0032;topics&#0032;explained&#0032;like&#0032;you&#0032;are&#0032;5&#0032;years&#0032;old&#0046; | Product Hunt" style={{ width: '200px', height: '50px' }} width="200" height="50" /></Link>
        )
      }
        </div>
    )
}

export default ProductHunt
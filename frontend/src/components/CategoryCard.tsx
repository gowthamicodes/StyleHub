import { Link } from "react-router-dom";


interface CategoryCardProps {
title: string;
image: string;

}

const CategoryCard = ({ title, image } : CategoryCardProps) => {
return(
<Link to={`/shop?category=${title}`} className="category-card">

<img src={image} alt={title} />

<div className="category-overlay">
<h3>{title}</h3>
<span>Shop Now → </span>

</div>

</Link>
)

}

export default CategoryCard;
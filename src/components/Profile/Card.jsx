/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import FeaturedIcon from "../icons/FeaturedIcon";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContext } from "../../context/ToastContext";
import { updateProductstatusPub } from "../../services/profile";
import { setProductStatusPub } from "../../app/features/product/product";

const CardProfile = ({ product }) => {
  console.log(product);
  console.log(product.categories);
  //const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { addToast } = useContext(ToastContext);
  //
  console.log(product.idProd);
  const idUser = useSelector((state) => state.user.user.idUser);
  // let idProdIdUser = 0;
  // if (idProdIdUser == 0) idProdIdUser = product.UserProduct.idUser;
  //
  const cardRef = useRef(null);
  useEffect(() => {
    const card = cardRef.current;
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          card.classList.remove("opacity-0");
          card.classList.add("blur-in-expand"); // index.css
          // card.classList.add('scale-up-top') // index.css
        }
      });
    };
    const observer = new IntersectionObserver(cb, { threshold: 0.2 });
    if (card) observer.observe(card);
    return () => {
      observer.disconnect();
    };
  }, []);
  const getCategoryNames = () => {
    if (product && product.categories.length > 0) {
      const categoryNames = product.categories.map((category) => {
        if (category.name === "sports and fitness / health and wellness") {
          return "sports and fitness";
        } else {
          return category.name;
        }
      });
      return categoryNames;
    } else {
      return ["No Category"];
    }
  };
  const handleActive = async (e) => {
    try {
      dispatch(
        setProductStatusPub(
          await updateProductstatusPub(product.idProd, "active")
        )
      );
      addToast({
        title: "Success",
        description: `${product.name}
        was activated`,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      addToast({ title: "Error", description: error.message, type: "warning" });
    }
  };
  const handleInactive = async (e) => {
    try {
      dispatch(
        setProductStatusPub(
          await updateProductstatusPub(product.idProd, "inactive")
        )
      );
      addToast({
        title: "Success",
        description: `${product.name} was paused`,
        type: "success",
      });
    } catch (error) {
      // console.log(error.message)
      addToast({ title: "Error", description: error.message, type: "warning" });
    }
  };
  return (
    <div
      key={product.idProd}
      ref={cardRef}
      className={
        product.statusPub == "inactive"
          ? "card opacity-0 shadow-md rounded-lg h-100 overflow-hidden bg-gradient-to-t from-amber-600 via-transparent to-transparent dark:bg-card_dark p-4"
          : "card  opacity-0 shadow-md rounded-lg h-100 overflow-hidden bg-white dark:bg-card_dark p-4"
      }
    >
      <div className="flex flex-col justify-between h-full">
        <Link to={`/product/${product.idProd}`}>
          <div className="h-48 rounded overflow-hidden mb-4">
            {product.isFeatured && (
              <div className="flex items-center gap-2 bg-dark_purple py-1">
                <FeaturedIcon className="w-7 h-7" />
                <div className="text-text_dark font-bold font-amaranth text-sm">
                  Sponsored
                </div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
        <div className="flex justify-between items-end text-2xl font-cabin font-bold mb-2">
          ${product.price}
          <span className="text-sm text-gray_dark mb-2">
            {formatDate(product.updatedAt)}
          </span>
        </div>
        <Link
          to={`/product/${product.idProd}`}
          className="text-2xl font-amaranth font-bold mb-2"
        >
          <p className="truncate max-w-full">{product.name}</p>
        </Link>
        {/* Categories */}
        <div className="mb-2 flex gap-1 flex-wrap text-medium_fuchsia truncate ">
          {getCategoryNames(product.idProd).map((category, index) => (
            <p
              key={index}
              className="text-sm px-2 py-1 bg-purple_badge rounded-lg truncate w-24"
            >
              {category}
            </p>
          ))}
        </div>
        <div className="flex justify-between items-end">
          <p className="text-sm text-gray_dark">
            {product.location},{product.state}
          </p>
          <button
            className=" bg-medium_purple hover:bg-dark_purple text-white px-0.5 py-0.5 rounded-lg cursor-pointer"
            onClick={
              product.statusPub === "inactive" ? handleActive : handleInactive
            }
          >
            {product.statusPub === "inactive" ? <>⏳</> : <>✖️</>}️
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;

import { Link } from "react-router-dom";
import FeaturedIcon from "../icons/FeaturedIcon";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useRef, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContext } from "../../context/ToastContext";
import { updateProductName, updateProductPrice } from "../../services/profile";
import {
  setProductName,
  upDateUserProductStatus,
  setProductPrice,
} from "../../app/features/product/product";
import DeleteIcon from "../icons/DeleteIcon";
import Hourglas from "../icons/Hourglass";
import HourglasOff from "../icons/HourglassOff";
import EditIcon from "../icons/EditIcon";
const CardProfile = ({ product }) => {
  const { addToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState(product.name);
  const [newPrice, setNewPrice] = useState(product.price);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  const handlePriceDoubleClick = () => {
    setIsEditingPrice(true);
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        await updateProductName({ idProd: product.idProd, name: newName });

        setIsEditing(false);
        dispatch(setProductName({ idProd: product.idProd, name: newName }));
      } catch (error) {
     
      }
    }
  };

  const handlePriceKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        await updateProductPrice({
          idProd: product.idProd,
          price: newPrice,
        });
        handlePriceDoubleClick(false);
        dispatch(
          setProductPrice({
            idProd: product.idProd,
            price: newPrice,
          })
        );
      } catch (error) {
      
      }
    }
  };
  const cardRef = useRef(null);
  useEffect(() => {
    const card = cardRef.current;
    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          card.classList.remove("opacity-0");
          card.classList.add("blur-in-expand");
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
        upDateUserProductStatus({
          idProd: product.idProd,
          statusPub: "active",
        })
      );

      addToast({
        title: "Success",
        description: `${product.name} was activated`,
        type: "success",
      });
    } catch (error) {
      addToast({ title: "Error", description: error.message, type: "warning" });
    }
  };

  const handleInactive = async (e) => {
    try {
      dispatch(
        upDateUserProductStatus({
          idProd: product.idProd,
          statusPub: "inactive",
        })
      );

      addToast({
        title: "Success",
        description: `${product.name} was paused`,
        type: "success",
      });
    } catch (error) {
      addToast({ title: "Error", description: error.message, type: "warning" });
    }
  };

  const handleDeleted = async (e) => {
    try {
      dispatch(
        upDateUserProductStatus({
          idProd: product.idProd,
          statusPub: "deleted",
        })
      );

      addToast({
        title: "Success",
        description: `${product.name} was deleted`,
        type: "danger",
      });
    } catch (error) {
      addToast({ title: "Error", description: error.message, type: "warning" });
    }
  };
  const classStatusProd =
    product.statusPub === "inactive"
      ? "card hover:scale-110 transition-transform duration-200  opacity-0 shadow-md rounded-lg h-100 overflow-hidden bg-gradient-to-t from-amber-600 via-transparent to-transparent dark:bg-card_dark p-4"
      : "card hover:scale-110 transition-transform duration-200  opacity-0 shadow-md rounded-lg h-100 overflow-hidden bg-white dark:bg-card_dark p-4";
  return (
    <div key={product.idProd} ref={cardRef} className={`${classStatusProd}`}>
      <button
        className="absolute top-0 right-0 p-2 text-white bg-red-500 rounded hover:scale-125 transition-transform duration-200"
        onClick={handleDeleted}
        title="Deleted"
      >
        <svg className="flex items-center w-5 h-5">
          <DeleteIcon width={20} height={20} className=" stroke-body_dark" />
        </svg>
      </button>
      <div className="flex flex-col justify-between h-full">
        <Link to={`/product/${product.idProd}`}>
          <div className="block h-48 rounded overflow-hidden mb-4">
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
        <span
          className="flex justify-between items-end text-2xl font-cabin font-bold mb-2 truncate"
          onDoubleClick={handlePriceDoubleClick}
        >
          $
          {isEditingPrice ? (
            <input
              type="text"
              maxLength="7"
              value={newPrice}
              onChange={handlePriceChange}
              onKeyDown={handlePriceKeyDown}
              className=" appearance-none bg-transparent w-full"
            />
          ) : (
            newPrice
          )}
          {}
          <span className="text-sm text-gray_dark mb-2">
            {formatDate(product.updatedAt)}
          </span>
        </span>
        <span
          to={`/product/${product.idProd}`}
          className="text-2xl font-amaranth font-bold mb-2"
        >
          <p className="truncate max-w-full" onDoubleClick={handleDoubleClick}>
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="appearance-none bg-transparent w-full h-6"
              />
            ) : (
              newName
            )}
          </p>
        </span>
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
            {product.location},{product.statusPub}
          </p>
          <button
            className="w-7 h-7 bg-medium_purple text-white px-0.5 py-0.5 rounded-lg cursor-pointer flex justify-center items-center hover:scale-125 transition-transform duration-200"
            title={product.statusPub === "inactive" ? "Play" : "Stop"}
            onClick={
              product.statusPub === "inactive" ? handleActive : handleInactive
            }
          >
            {product.statusPub === "inactive" ? (
              <HourglasOff
                width={20}
                height={20}
                className="stroke-dark_purple dark:stroke-light_purple "
              />
            ) : (
              <Hourglas
                width={20}
                height={20}
                className="stroke-dark_purple dark:stroke-light_purple"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;

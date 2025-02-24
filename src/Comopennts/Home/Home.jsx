import axios from "axios";
import AllProduct from "../AllProduct/AllProduct";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import sliderImg1 from "../../assets/images/slider-image-1.jpeg";
import sliderImg2 from "../../assets/images/slider-image-2.jpeg";
import sliderImg3 from "../../assets/images/slider-image-3.jpeg";
import blogImg1 from "../../assets/images/blog-img-1.jpeg";
import blogImg2 from "../../assets/images/blog-img-2.jpeg";
import useCategories from "../../Hooks/useCategories";
export default function Home() {
  const {allCategories,isLoading:cate} = useCategories();
  function getAllProduct() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { data, isLoading } = useQuery({
    queryKey: ["AllProducts"],
    queryFn: getAllProduct,
    //  cacheTime:10000*60,
    // refetchOnMount:false,
    // refetchOnWindowFocus:true,
  });
  const allproduct = data?.data.data;
  
  return (
    <>
      {/* Slider */}
      <div className="grid grid-cols-6 mt-30 mx-[100px] ">
        <div className="bg-red-500 col-span-4 overflow-hidden">
          <Swiper
            className="h-[calc(100vh-60px)] overflow-hidden"
            style={{ height: "100%", zIndex: 1 }}
            loop={true}
          >
            <SwiperSlide className="">
              <img
                src={sliderImg1}
                className="w-full h-full "
                alt="sliderImg1"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImg2}
                className="w-full h-full block"
                alt="sliderImg2"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={sliderImg3}
                className="w-full h-full block"
                alt="sliderImg3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="bg-red-500 col-span-2 ">
          <img src={blogImg1} className="h-1/2" alt="blogImg1" />
          <img src={blogImg2} className="h-1/2" alt="blogImg2" />
        </div>
      </div>
      {/* Slider */}

      {/* Slider CateGories */}
      <Swiper slidesPerView={5} loop={true} className="mt-15">
        {allCategories?.map((cate) => (
          <SwiperSlide key={cate._id}>
            <img
              src={cate.image}
              alt="cate.imge"
              className="h-[300px] w-full "
            />
            <p>{cate.name} </p>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Slider CateGories */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="mx-[100px] mt-15  ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5  ">
            {allproduct.map((prod) => (
              <AllProduct key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

import { FC, useEffect, useState } from "react";
import ShopProductItem from "../../components/shop-product-item/shop-product-item.component";
import axios from "axios";
import { Product } from "../../store/product/product.types";
import TiendaSearch from "../../components/tienda-search/tienda-search.component";



const Tienda : FC = () => {
    const [_page, setPage] = useState(1);
    const [_perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [searchFilters, setSearchFilters] = useState<{minPrecio: number | string, maxPrecio: number | string, nombre: ''}>({
        minPrecio: '',
        maxPrecio: '',
        nombre: ''
    });
    const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';

    useEffect(() => {
        getProducts();
    }, [_page, searchFilters]);

    const searchPage = (page: number) => setPage(page);

    const getProducts = async () => {
        try{
            let url = `${apiUrl}/products?_page=${_page}&_perPage=${_perPage}`;
            if(searchFilters.minPrecio !== ''){
                url+=`&price_gte=${searchFilters.minPrecio}`;
            }
            if(searchFilters.maxPrecio !== ''){
                url+=`&price_lte=${searchFilters.maxPrecio}`;
            }
            if(searchFilters.nombre !== ''){
                url+=`&name_like=${searchFilters.nombre}`;
            }
            const productList = await axios.get(url);
            setProducts(productList.data);

            const totalCount = productList.headers['x-total-count'] ?? 0;
            setTotalPages(Math.round(totalCount / _perPage));
        }catch(ex){

        }
    };

    const getProductsSearch = (result: any) => {
        setSearchFilters((prevstate) => ({
            ...prevstate,
            minPrecio: result.minPrecio,
            maxPrecio: result.maxPrecio,
            nombre: result.nombre
        }));
    }

    return (
        <div className="grid grid-cols-4">
            <span className="col-span-full text-left font-bold text-lg my-3">Tienda</span>
            <div className="col-span-full filtros-container my-3">
                <TiendaSearch handleSearchComplete={getProductsSearch}/>
            </div>
            
            <div className="col-span-full grid grid-cols-8 gap-3 product-grid">
                {
                    products.map((product) => (
                        <div key={product.id} className="col-span-2">
                            <ShopProductItem product={product}/>
                        </div>
                    ))
                }
            </div>
            
            {
                totalPages >= 1 && 
                <div className="join col-span-full justify-center my-4 pagination">
                    {
                        Array.from({ length: totalPages }).map((item, index) => (
                            <button className={"join-item btn "+(index + 1 === _page ? 'btn-active' : '')} key={index} onClick={() => searchPage(index + 1)}>{index + 1 }</button>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Tienda;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { isEqual } from "lodash";
import {SideBar, toggleOpen } from '../components/SideBar.jsx';
import { Badge } from "@/components/ui/badge.jsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { GenericName, toTitleCase } from "@/components/genericFunctions.jsx";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/Card";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
    

function Products() {

    const [products,setProducts] = useState([]);
    const backend = import.meta.env.VITE_BACKEDN_SERVER;
    let { category, page } = useParams();
    const [featureList,setFeatureList] = useState([]);
    const [sidebar,setSidebar] = useState(false);
    const [filter,setFilter] = useState([]);
    const pageSize = 10;
    let filterItemNumber = 0;

    if(page == null)
        page = 1;
    
    useEffect(() => {
        fetch(`http://${window.location.hostname}:${backend}` + '/api/products/category/' + category).then(res => {
            if(!res.ok){
                console.error(res.error);
            }else{
                res.json().then(data => {
                    if(data.success){
                        const newFeatureList = {};
                        data.data.map((item) => {
                            item.features.map((feature,indx) => {
                                try {
                                    const fkey = feature[0];
                                    const fval = GenericName(toTitleCase(feature[1]));
                                    item.features[indx][1] = fval;
                                    if(fval.length <= 20){
                                        if (!(fkey in newFeatureList)) 
                                            newFeatureList[fkey] = [];
                                        if(!newFeatureList[fkey].includes(fval))
                                        newFeatureList[fkey].push(fval);
                                    }
                                } catch (error) {
                                    console.error(feature,error);
                                }
                            });
                        })
                        setFeatureList(newFeatureList);
                        if(data.data == null)
                            setProducts([]);
                        else if(!isEqual(data.data,products))
                            setProducts(data.data);
                        
                    }
                    
                })
            }
        });
    },[products,category]);
    

    return (
        
        <div className="flex grow pb-10">
            <SideBar state={sidebar} >
                <Accordion type="single" collapsible>
                    {
                        Object.entries(featureList).map(([key,value]) => {
                            value.sort();
                            return (
                                <AccordionItem value={key} key={key}>
                                    <AccordionTrigger>{key}</AccordionTrigger>
                                    <AccordionContent>
                                        {
                                            value.map((val,index) => (
                                                <div key={val+index} className="flex items-center gap-2">
                                                    <Checkbox checked={
                                                        filter.includes(`${val}@${key}`)
                                                    } onCheckedChange={(state) => {
                                                        if(state)
                                                            setFilter([...filter,`${val}@${key}`]);
                                                        else
                                                            setFilter(filter.filter(item => item != `${val}@${key}`));
                                                    }} /> <span>{val}</span>
                                                </div>
                                            ))
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </SideBar>
            <div className="w-full px-10 flex flex-col">
                <div className="flex items-center  text-xl sm:text-5xl">
                    <div onClick={() => toggleOpen(setSidebar)} className="inline  scale-x-[-1]"><i className={`nf ${sidebar?"nf-oct-sidebar_expand":"nf-oct-sidebar_collapse"} text-slate-700`}></i></div>
                    <div className="mx-auto text-center p-10 font-extrabold">{toTitleCase(category.replace(/-/g,' '))}</div>
                </div>
                {
                    products.length != 0 && (
                        <div className="flex flex-wrap justify-center gap-10 mx-10 mb-10">
                        {
                            products.filter(product => {
                                let filterNumber = 0;
                                if(filter.length > 0){
                                    for(let i=0;i<product.features.length;i+=1){
                                        const [ currentFeature, currentFeatureValue ] = product.features[i];
                                        if(filter.includes(`${currentFeatureValue}@${currentFeature}`)){
                                            filterNumber += 1;
                                        }
                                    }
                                }
                                if(filterNumber == filter.length){
                                    filterItemNumber += 1;
                                    return true;
                                }
                                return false;
                            }).slice((page-1)*pageSize,page*pageSize).map((value,index) => {
                                return (
                                    <Card className="border max-w-sm border-black rounded-none flex flex-col justify-between" key={index}>
                                        <div>
                                            <CardContent className="relative">
                                                <Badge className="absolute right-5">{value.price}</Badge>
                                                <img src={value.image} alt={value.name} className="mx-auto" />
                                            </CardContent>
                                            <CardHeader>
                                                <CardTitle>{value.name}</CardTitle>
                                                <CardDescription>{value.description}</CardDescription>
                                            </CardHeader>
                                        </div>
                                        <CardFooter>
                                            <Link to={'/product/'+value.id}><Button>View Product</Button></Link>
                                        </CardFooter>
                                    </Card>
                                );
                            })
                        }
                    </div>
                    )
                }
                {
                    products.length == 0 && (
                        <div className="w-full h-full flex flex-col justify-center text-center text-2xl sm:text-4xl lg:text-8xl">
                            <div>(╯°□°)╯ poof! <br /><br /> Where's the data</div>
                        </div>
                    )
                }
                <Pagination className={products.length == 0?'hidden':''}>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious to={ Number(page) > 1?`/category/${category}/${page-1}`:''} />
                        </PaginationItem>
                        <PaginationItem className={page-3 <= 0?'hidden':''}>
                        <PaginationLink to={`/category/${category}/${page-3}`} >{page-3}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem className={page-2 <= 0?'hidden':''}>
                        <PaginationLink to={`/category/${category}/${page-2}`} >{page-2}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem className={Number(page)+2 > Math.ceil(filterItemNumber/pageSize)?'hidden':''}>
                        <PaginationLink to={`/category/${category}/${Number(page)+2}`} >{Number(page)+2}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem className={Number(page)+3 > Math.ceil(filterItemNumber/pageSize)?'hidden':''}>
                        <PaginationLink to={`/category/${category}/${Number(page)+3}`} >{Number(page)+3}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationNext to={Math.ceil(filterItemNumber/pageSize) >= Number(page)+1?`/category/${category}/${Number(page)+1}`:''} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </div>
    );
}

export default Products;
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { isEqual, remove } from "lodash";
import {SideBar, toggleOpen } from '../components/SideBar.jsx';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/Card";
import { Button } from "@/components/ui/button";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox"

  
  

function Products() {

    const [products,setProducts] = useState([]);
    const backend = import.meta.env.VITE_BACKEDN_SERVER;
    const { category } = useParams();
    const [featureList,setFeatureList] = useState([]);
    const [sidebar,setSidebar] = useState(false);
    const [filter,setFilter] = useState([]);

    function GenericName(nameStr){
        nameStr = nameStr.replace(/\s*-\s*/g, " ");
        nameStr = nameStr.replace(/\s+/g, " ");
        const subs = nameStr.split(' ');
        if(subs.length > 1 && /^[\d.]+$/.test(subs[0]) && /^[a-zA-Z]+$/.test(subs[1])){
            if(subs[1].length > 2)
                subs[1] = subs[1].slice(0,2);
            nameStr = subs[0]+subs[1].toUpperCase()+' '+subs.slice(2).join(' ');
        }
        else if(/^\d+[a-z]/.test(subs[0])){
            subs[0] = subs[0].toUpperCase();
            nameStr = subs.join(' ');
        }
        else if(/^[\d.]+\"/.test(subs[0])){
            subs[0] = subs[0].replace('"','IN');
            nameStr = subs.join(' ');
        }
        nameStr = nameStr.trimEnd();;
        return nameStr;
    }
    
    function toTitleCase(str) {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    
    useEffect(() => {
        fetch(backend + '/api/products/category/' + category).then(res => {
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
    },[products]);
    

    return (
        
        <div className="flex">
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
                                                    <Checkbox onCheckedChange={(state) => {
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
            <div>
                <div className="flex items-center px-10  text-5xl">
                    <div onClick={() => toggleOpen(setSidebar)} className="inline  scale-x-[-1]"><i className={`nf ${sidebar?"nf-oct-sidebar_expand":"nf-oct-sidebar_collapse"} text-slate-700`}></i></div>
                    <div className="mx-auto text-center p-10 font-extrabold">{category.slice(0,1).toUpperCase() + category.slice(1)}</div>
                </div>
                <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mx-10 mb-10">
                    {
                        products.map((value,index) => {
                            let filterMatch = true;
                            
                            if(filter.length > 0){
                                filterMatch = false;
                                for(let i=0;i<value.features.length;i+=1){
                                    const [ currentFeature, currentFeatureValue ] = value.features[i];
                                    if(filter.includes(`${currentFeatureValue}@${currentFeature}`)){
                                        filterMatch = true;
                                        break;
                                    }
                                }
                            }
                            
                            if(filterMatch)
                            return (
                                <Card className="border border-black rounded-none flex flex-col justify-between" key={index}>
                                    <div>
                                        <CardContent>
                                            <img src={value.image} alt={value.name} className="mx-auto" />
                                        </CardContent>
                                        <CardHeader>
                                            <CardTitle>{value.name}</CardTitle>
                                            <CardDescription>{value.description}</CardDescription>
                                        </CardHeader>
                                    </div>
                                    <CardFooter>
                                        <Button>View Product</Button>
                                    </CardFooter>
                                </Card>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Products;
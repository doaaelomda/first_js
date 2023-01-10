let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let categary=document.getElementById('categary');
let submit=document.getElementById('submit');
let mood='create';
let temp;
function gettotle(){
    if(price.value != ""){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }

}
let datapro;
if (localStorage.producats != null){
    datapro=JSON.parse(localStorage.producats)
}
else{
    datapro=[];
}
submit.onclick=function()
{
    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        categary:categary.value
    }
    if(title.value !='' && price.value != '' && categary.value !='' && newpro.count<100){
    if(mood==='create'){
        if(newpro.count >1){
            for(let j=0;j<newpro.count;j++){
                datapro.push(newpro)
            }
        }
        else{
            datapro.push(newpro)
        }

    }
    else{
        datapro[temp]=newpro;
        mood='create'
        submit.innerHTML='create';
        count.style.display='block'
    }
    cleardata()
}
    localStorage.setItem('producats',JSON.stringify(datapro))
    
    showdata()
    
}
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    categary.value='';

}
function showdata(){
    gettotle()
    let table='';
    for(let i=0+1 ; i<datapro.length ; i++){
        table +=`
        <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].categary}</td>
                        <td><button onclick="updatedata(${i})" id="update" >update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                    </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteall')
    if(datapro.length >0){
        
        btndelete.innerHTML=` <button onclick=deletes()> delete All(${datapro.length}) </button> `
    }
    else{
        btndelete.innerHTML=''
    }

}
function deletedata(i){
    
    datapro.splice(i,1);
    localStorage.producats=JSON.stringify(datapro);
    
    showdata();

}
function deletes(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}
showdata()
function updatedata(i)
{
    title.value=datapro[i].title
    price.value=datapro[i].price
    taxes.value=datapro[i].taxes
    ads.value=datapro[i].ads
    discount.value=datapro[i].discount
    categary.value=datapro[i].categary
    gettotle()
    count.style.display='none'
    submit.innerHTML='Update'
    mood='update'
    temp=i
    scroll({
        top:0,
        behavior:'smooth'
    })
}
let searchmood='title'
function getsearchmood(id){
    let search=document.getElementById('search')
    if (id=='searchtitle'){
        searchmood='title'
    }
    else{
        searchmood='category'
    }
    search.placeholder='search by '+searchmood
    search.focus()
    search.value=''
    showdata()

}
function searchdata(value)
{
    let table='';
    if(searchmood=='title')
    {
    for(let i=0;i <datapro.length;i++){
            if(datapro[i].title.includes(value)){
                table +=`
                <tr>
                                <td>${i}</td>
                                <td>${datapro[i].title}</td>
                                <td>${datapro[i].price}</td>
                                <td>${datapro[i].taxes}</td>
                                <td>${datapro[i].ads}</td>
                                <td>${datapro[i].discount}</td>
                                <td>${datapro[i].total}</td>
                                <td>${datapro[i].categary}</td>
                                <td><button onclick="updatedata(${i})" id="update" >update</button></td>
                                <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                            </tr>
                
                `
            }
        else{
        if(datapro[i].categary.includes(value)){
            table +=`
            <tr>
                            <td>${i}</td>
                            <td>${datapro[i].title}</td>
                            <td>${datapro[i].price}</td>
                            <td>${datapro[i].taxes}</td>
                            <td>${datapro[i].ads}</td>
                            <td>${datapro[i].discount}</td>
                            <td>${datapro[i].total}</td>
                            <td>${datapro[i].categary}</td>
                            <td><button onclick="updatedata(${i})" id="update" >update</button></td>
                            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                        </tr>
            
            `
        }
        }
    }
}
    document.getElementById('tbody').innerHTML=table;

}
const paginationContainer = document.querySelector('.pagination');  
const prevButton = document.querySelector('.prev'); 
const nextButton = document.querySelector('.next'); 
console.log(prevButton, nextButton); 
const url = `https://pixabay.com/api/?key=48165883-65f9cee792e12f4d73d6b41d8`; 
let page = 1;  
let imagesPerPage = 3;  
let imagesData = []; 
  
async function getImages(){  
    try {  
        const getData = await getFetch()  
        if (getData && getData.length > 0) {  
            imagesData = getData;  
            console.log(imagesData);  
            page = 1  
            unlockButton() 
          getDataLayout(imagesData)    
        }   
    }catch(error){  
        showError(error.message)  
    }  
      
}  
  
async function getFetch() {  
    try {  
        const fetchResponse = await fetch(url)  
           
        if (!fetchResponse.ok) {  
            throw new Error(`error http, status: ${fetchResponse.status}`)  
        }  
        const data = await fetchResponse.json()  
        return data.hits;
  
    } catch (error) {  
        console.log(`get fetch error: ${error}`)  
        throw error;  
    }  
  
}  
  
  
  
function getDataLayout(image) {  
    paginationContainer.innerHTML = ''  
    const start = (page-1)*imagesPerPage;  
    const end = start + imagesPerPage;  
    const currentPage = image.slice(start, end)  
    currentPage.forEach((img) => {  
        const dataHTML = `   
    <div>   
        <p>id:${img.previewURL}</p>   
        <p>name:${img.type}</p>   
    </div>   
    `  
    paginationContainer.innerHTML += dataHTML;  
    })  
  
} 
 
function unlockButton() { 
    prevButton.disabled = page === 1; 
    nextButton.disabled = page === Math.ceil(imagesData.length / imagesPerPage) 
} 
  
getImages() 
 
function changeNextPage() { 
    if(page < Math.ceil(imagesData.length / imagesPerPage)) { 
        page++; 
        unlockButton() 
        getDataLayout(imagesData) 
    } 
    console.log('change') 
} 
 
 
function changePreviousPage() { 
    if(page > 1) { 
        page--;  
        unlockButton() 
        getDataLayout(imagesData) 
    } 
    console.log('changePrevious') 
} 
function showError(error) { 
    paginationContainer.innerHTML = `<p>Error is${error}</p>`
} 
 
nextButton.addEventListener('click', changeNextPage) 
prevButton.addEventListener('click', changePreviousPage)
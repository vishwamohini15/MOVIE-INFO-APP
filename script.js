let searchForm=document.querySelector("form")
let movieContainer=document.querySelector(".movie-container")
let inputBox=document.querySelector(".inputbox")
let submitbtn=document.querySelector(".searchbtn")
// let movieDetails=document.querySelector(".movie-details")

//function to featch movie api
const getMovieInfo=async(movie)=>{
     try {
     
const myApikey="6727cb93";
const url=`https://www.omdbapi.com/?apikey=${myApikey}&t=${movie}`

const response= await fetch(url)

if (!response.ok) {
     throw new Error("unable to featch movie data")
}

const data=await response.json()
console.log(data);

showMovieData(data)
     
} 
catch (error) {
     showerrorMessage("No movie Found")
}
          
}

//Function to show movie data on screen
const showMovieData=(data)=>{
movieContainer.innerHTML="";
movieContainer.classList.remove("nobackground")

//Destructuring
const {Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

const movieElement=document.createElement("div")
movieElement.classList.add("movie-info")

movieElement.innerHTML=`<h2>${Title}</h2>
                    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`

const movieGenreElement=document.createElement("div")
movieGenreElement.classList.add("movie-genre")

Genre.split(",").forEach(element => {
     const p=document.createElement('p')
     p.innerText=element;
     movieGenreElement.appendChild(p)
});

movieElement.appendChild(movieGenreElement)

movieElement.innerHTML +=`<p><strong>Released Date: </strong>${Released}</p>
                         <p><strong>Duration: </strong>${Runtime}</p>
                         <p><strong>Cast: </strong>${Actors}</p>
                         <p><strong>Duration: </strong>${Plot}</p>`

  //create a div for movie poster                       
  const moviePosterElement=document.createElement("div")
moviePosterElement.classList.add("movie-poster")
moviePosterElement.innerHTML=`<img src="${Poster}"/>`

movieContainer.appendChild(moviePosterElement)
movieContainer.appendChild(movieElement)



}

//function to display error message
const showerrorMessage=(message)=>{
     movieContainer.innerHTML=`<h2>${message}</h2>`
          movieContainer.classList.add("nobackground")
}

//Function to handle submission
 const handleFormSubmission=(e)=>{
     e.preventDefault()
     // console.log(inputBox.value);
     const movieName=inputBox.value.trim();
     if (movieName !="") {
          showerrorMessage("Please Wait!, Fetching Movie Information...")
          getMovieInfo(movieName)
     }else{
         
        showerrorMessage("Please Enter your movie Name for Movie Information")
     }
 }

// Adding event listener to search form
submitbtn.addEventListener("click",handleFormSubmission);
    

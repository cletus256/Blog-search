const apikey = 'cda8e7770c1a43d3a86617df9112030c'

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        return data.articles;
    }catch(error){
        console.error("Error fetching Random News", error)
        return [];
    }
}

// function for search
searchButton.addEventListener("click", async () => {
    const searchQuery = searchField.value.trim();
    if(searchQuery !== ""){
        try{
            const articles = await fetchNewsQuery(searchQuery);
            displayBlogs(articles);
        }catch(error){
            console.error("Error fetching Search Results", error)
        }
    }
})

async function fetchNewsQuery(searchQuery){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        return data.articles;
    }catch(error){
        console.error("Error fetching Random News", error);
        return [];
    }
}


// function to display random blogs
function displayBlogs(articles){
    blogContainer.innerHTML = ""
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30? article.title.slice(0, 30) + "...":article.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedDesc = article.description.length > 120? article.description.slice(0, 120) + "...":article.description;
        description.textContent = truncatedDesc

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {window.open(article.url, "_blank")})
        blogContainer.appendChild(blogCard);
    });

}
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching Random News", error)
    }
}) ();
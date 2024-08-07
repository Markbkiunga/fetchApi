const apiUrl = "http://localhost:3000/photos"

// Getting All Resources

fetch(apiUrl)
.then(res => res.json())
.then(photos => photos.forEach(photo => createPhoto(photo)))


// function to create single photo div

function createPhoto(photo){
    const {albumId, id, title, url, thumbnailUrl} =  photo

    let wrapper = document.getElementById("photo-wrapper")

    const divCard = document.createElement('div')
    divCard.className = 'photo'


    const html = `
            <div>
            <img src=${thumbnailUrl}>
            </div>
            <div>
            <h3>Title: ${title}</h3>
            </div>
            <div>
            <button><a href=${url} target="_blank">View Image</a></button>
            </div>
            <div class="btn"><button type="button" id="delete" onclick = "deletePhoto(${id})">Delete</button><button type="button" id="edit" onclick= " editPhoto(${albumId}, ${id}, '${title}', '${url}', '${thumbnailUrl}')">Edit</button></div>

    `
    divCard.innerHTML = html

    wrapper.appendChild(divCard)


}

// Posting a resource

let form = document.getElementById('form')

form.addEventListener('submit', e =>  {

    // prevent form for reloading
    e.preventDefault()
    console.log(e)
    
    // getting form inputs
    let photoAlbum = document.getElementById('album').value
    let photUrl = document.getElementById('image').value
    let photoThumbnail = document.getElementById('thumb').value
    let PhotoTitle = document.getElementById('title').value

    // creating object from form input
    const formData = {
        albumId : photoAlbum,
        url : photUrl,
        thumbnailUrl: photoThumbnail,
        title: PhotoTitle
    }
    console.log(formData)
    
   
    // sending data to the server using fetch api
    fetch(apiUrl, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(photo => console.log(photo))

    // Resetting form inputs
    document.getElementById('album').value = ""
    document.getElementById('image').value = ""
    document.getElementById('thumb').value = ""
    document.getElementById('title').value = ""

    

   



})

// Deleting a resource

function deletePhoto(id){
    console.log(id)

    fetch(`${apiUrl}/${id}`, {
        method : "DELETE"
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

// Editing Photo

function editPhoto(albumId, id, title, url, thumbnailUrl){

    
   

    // updating form inputs
        document.getElementById('album').value = albumId
        document.getElementById('image').value = url
        document.getElementById('thumb').value = thumbnailUrl
        document.getElementById('title').value = title



        let btn = document.getElementById('btn')

        btn.addEventListener('click', function(e){
            e.preventDefault()

        // getting updated form inputs
        let updatedAlbum = document.getElementById('album').value
        let updatedPhotoUrl = document.getElementById('image').value
        let updatedPhotoThumbnail = document.getElementById('thumb').value
        let updatedPhotoTitle = document.getElementById('title').value


        // creating form object
        let formData = {
            albumId : updatedAlbum,
            url : updatedPhotoUrl,
            thumbnailUrl: updatedPhotoThumbnail,
            title: updatedPhotoTitle
        }

            
        // updating the resource on our server
            fetch(`${apiUrl}/${id}`, {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body : JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(photo => console.log(photo))

        })

}




$(document).ready(function () {
    var item, tile, author, publisher, bookLink, bookImg;
    var outputList = document.getElementById("list-output");
    var bookUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
    var placeHldr = '<img src="https://via.placeholder.com/150">';
    var searchData;

    let button = document.getElementsByClassName('btn');
    let searched = document.getElementById('search');


    //listener for search button
    $("#btn").click(function () {
        var x = document.getElementById('para');
        if (x.style.display === 'block') {
            x.style.display = 'none';

        }
        else {
            x.style.display = 'block';
        }
        document.getElementById('book-name').innerHTML = searched.value;
        outputList.innerHTML = ""; //empty html output
        document.body.style.backgroundImage = "url('')";
        searchData = $("#search").val();
        //handling empty search input field
        if (searchData === "" || searchData === null) {
            displayError();
        }
        else {
            // console.log(searchData);
            // $.get("https://www.googleapis.com/books/v1/volumes?q="+searchData, getBookData()});
            $.ajax({
                url: bookUrl + searchData,
                dataType: "json",
                success: function (response) {
                    console.log(response)
                    if (response.totalItems === 0) {
                        alert("no result!.. try again")
                    }
                    else {
                        displayResults(response);
                    }
                },
                error: function () {
                    alert("Something went wrong.. <br>" + "Try again!");
                }
            });
        }
        $("#search").val(""); //clearn search box
    });

    /*
    * function to display result in index.html
    * @param response
    */
    function displayResults(response) {
        for (var i = 0; i < response.items.length; i += 3) {
            item = response.items[i];
            title1 = item.volumeInfo.title;
            author1 = item.volumeInfo.authors;
            publisher1 = item.volumeInfo.publisher;
            bookLink1 = item.volumeInfo.previewLink;
            bookIsbn = item.volumeInfo.industryIdentifiers[1].identifier
            bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeHldr;

            item2 = response.items[i + 1];
            title2 = item2.volumeInfo.title;
            author2 = item2.volumeInfo.authors;
            publisher2 = item2.volumeInfo.publisher;
            bookLink2 = item2.volumeInfo.previewLink;
            bookIsbn2 = item2.volumeInfo.industryIdentifiers[1].identifier
            bookImg2 = (item2.volumeInfo.imageLinks) ? item2.volumeInfo.imageLinks.thumbnail : placeHldr;


            // in production code, item.text should have the HTML entities escaped.
            outputList.innerHTML += '<div class="row mt-4">' +
                formatOutput(bookImg1, title1, author1, publisher1, bookLink1, bookIsbn) +
                formatOutput(bookImg2, title2, author2, publisher2, bookLink2, bookIsbn2) +
                '</div>';

            console.log(outputList);
        }
    }

    /*
    * card element formatter using es6 backticks and templates (indivial card)
    * @param bookImg title author publisher bookLink
    * @return htmlCard
    */
    function formatOutput(bookImg, title, author, publisher, bookLink, bookIsbn) {
        // console.log(title + ""+ author +" "+ publisher +" "+ bookLink+" "+ bookImg)
        var viewUrl = 'index.html?isbn=' + bookIsbn; //constructing link for bookviewer
        var htmlCard = `<div class="col-lg-6">
         <div class="card" style="">
           <div class="row no-gutters bg-light border border-light border-2 border-opacity-20 rounded-4" style="width: 25rem;">
             <div class="col-md-4">
               <img src="${bookImg}" class="card-img" alt="...">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 <h5 class="card-title">${title}</h5>
                 <p class="card-text">Author: ${author}</p>
                 <p class="card-text">Publisher: ${publisher}</p>
                 <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Read Book</a>
               </div>
             </div>
           </div>
         </div>
       </div>`
        return htmlCard;
    }

    //handling error for empty search box
    function displayError() {
        alert("search term can not be empty!")
    }
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       


    //Search History


    //     if (localStorage.getItem('itemJson') == null) {
    //         itemJsonArray = [];
    //         itemJsonArray
    //             .push([searched.value, datetime]);
    //         localStorage.setItem('itemJeson',
    //             JSON.stringify(itemJsonArray))
    //     }
    //     else {
    //         itemJsonArrayStr=
    //         localStorage.getItem('itemJeson');
    //         itemJsonArry = JSON.parse(
    //             itemJsonArrayStr);

    //         itemJsonArray
    //             .push([searched.value, datetime]);
    //         localStorage.setItem('itemJeson',
    //             JSON.stringify(itemJsonArray))
    //     }

    //     update();
    //     // updating inputs in table   
    //     function update() {
    //         if (localStorage.getItem('itemJson') == null) {
    //             itemJsonArray = [];
    //             localStorage.setItem('itemJeson',
    //                 JSON.stringify(itemJsonArray))
    //         }
    //         else {
    //             itemJsonArrayStr =
    //                 localStorage.getItem('itemJeson');
    //             itemJsonArry = JSON.parse(
    //                 itemJsonArrayStr);
    //         }
    //         let tableData = document.getElementById("tabledata");
    //         let str = "";
    //         itemJsonArray.forEach((element, index) => {

    //             str += ` <tr>
    // <th scope="row"> ${index}</th>
    //  <td> ${element[0]}</td>
    //   <td> ${element[1]}</td>
    //             </tr>`;
    //         });
    //         tablebody.innerHTML = str;

    //     }
    //     update();


    //     //Clear history

    // let clearHistory;
    // function clearHistory1() {
    //   clearHistory = arr.splice(index, 1);
    //   console.log(clearHistory);
    //   // Now after removing the specified indexed element reprint the all user again
    //   tableBodyContent.innerHTML = '';
    //   console.log(arr)
    //   arr.map((element, index) => {
    //     tableBodyContent.innerHTML += `
    //     <tr>
    //     <td>id: ${index + 1}.</td>
    //     <td>Name: ${element.searched.value}</td>
    //     <td>Prefession: ${element.datetime}</td>
    //     </tr>`
    //     console.log(tableBodyContent.innerHTML);
    //   })
    //   console.log(arr)
    //   if (arr.length === 0) {
    //     document.getElementById('table').classList.add('hidden');
    //   }
    // }

});

function history(){
    window.location.href ="/history.html";
    let date = new Date();
    let datetime = "Searched On" + date.getDate() + "at" + currentdate.getHours() + ":"
        + currentdate.getMinutes() + "PM";
    let inputText=searchData.value;
    if(!inputText){
        var searchHistoryData={
            inputText:inputText,
            datetime:datetime,
        };
        const searchHistory=localStorage.getItem("books");
        console.log("Books",books);
        var booksArr=[];
        if(books){
            booksArr=JSON.parse(localStorage.getItem("books"));
        }
        else{
            booksArr=[searchHistoryData];
        }
       let tableData=document.getElementById('tableBody').innerHTML= localStorage.setItem("books", JSON.stringify(booksArr));
        window.location.href ="/searched.html";
    } 
}




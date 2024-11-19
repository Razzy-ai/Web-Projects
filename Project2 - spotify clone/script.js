console.log("Lets start javascript")

// let currentsong =  new Audio();

async function getSongs() {
   let a = await fetch('http://localhost:3000/songs')
   // let a = await fetch('C:\Users\RITESH MOHITE\OneDrive\Desktop\Web Projects\Project2 - spotify clone\songs')

   let response = await a.text();
   // a.text() converts the response (likely a list of file links) into text, and the function waits (await) for that conversion.
   console.log(response)

   let div = document.createElement('div')
   div.innerHTML = response

   let as = div.getElementsByTagName('a')
   // div.getElementsByTagName('a') collects all the anchor (<a>) tags from the HTML (these are the links in the response). It stores them in the variable as.

   let songs = []
   for (let index = 0; index < as.length; index++) {
      const element = as[index];

      if (element.href.endsWith('mp3')) {
         songs.push(element.href.split("/songs/")[1])
      }
   }
   return songs;

}

//  const playMusic =(track) =>{
    
//    let audio = new Audio("/ songs/" + track)
//    audio.play()
//    // // currentsong.src = "/songs/" + track
//    // currentsong.src = `http://127.0.0.1:5500/Project2%20-%20spotify%20clone/songs/${encodeURIComponent(track)}`;

//    // currentsong.play()
//  }
const playMusic = (track) => {
   // Construct the full URL to the song on the backend server
   const filePath = `http://localhost:3000/songs/${encodeURIComponent(track)}`;
   console.log("Playing file from:", filePath); // Debugging: Check the generated URL

   let audio = new Audio(filePath);
   audio.play().catch(error => console.error("Error playing audio:", error));
};



async function main() {

   
   //    get the list of all the songs
   let songs = await getSongs()
   console.log(songs)

   let songUL = document.querySelector('.songList').getElementsByTagName("ul")[0]
   for (const song of songs) {
      
      // Clean up the song title
    const cleanedSong = song.replace(/%20/g, ' ').replaceAll(/(\s*\(.*?\)|\.Remix|PagalNew\.Com\.Se)/g, '').trim();
    
    // Remove any duplicate spaces
    const mainName = cleanedSong.replace(/\s+/g, ' ');


    songUL.innerHTML += `
        <li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div style="font-size: 15px;">${mainName}</div>
                <div style="font-size: 15px;">Razzy</div>
            </div>
            <div class="playnow" >
                <span>Play now</span>
                <img width="25px" class="invert" src="play.svg" alt="">
            </div>
        </li>`;
   }

   // attach an event listener to each 
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {

   e.addEventListener("click" , element =>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
   })

  });
}

main()

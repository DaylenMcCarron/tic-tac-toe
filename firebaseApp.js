


    function joinedRoom() {

        let playerId;
        let playerRef;

        onAuthStateChanged(auth , (user) => {
            console.log(user)
            if (user) {
                //loggedin
                playerId = user.uid;
                playerRef = ref(database, `players/${playerId}`);

                set(playerRef,{
                    id: playerId,
                    name: username,
                    player: "1",
                    pos: ["1","2","0","0","1"],
                })

            } else {
                //loggedout
            }
        });

        signInAnonymously(auth).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage)
        });
    };

    //USER INFO
    let username = "";
    let pos = [];
    let playerNum = "";

    function saveGuestName() {
    console.log('saving guest');
    if (username == "") {
        username = document.getElementById('guestName').value;
        document.getElementById('displayUsername').innerHTML = `Welcome ${username}`;
    }
  }
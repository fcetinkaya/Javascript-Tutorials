              var path = window.location.pathname;
              var page = path.split("/").pop();
              if (page === "AccountSettings.html") {
                  firebase.auth().onAuthStateChanged(function (user) {
                      if (user) {
                          var userID = firebase.auth().currentUser.uid;
                          firebase
                              .database()
                              .ref("users-blog/" + userID)
                              .once("value")
                              .then(function (snapshot) {
                                  if (snapshot.val()) {
                                      window.location.href = "MainPage.html";
                                  }
                              });
                      }
                  });
              } else {
                  firebase.auth().onAuthStateChanged(function (user) {
                      if (user) {
                          var userID = firebase.auth().currentUser.uid;
                          firebase
                              .database()
                              .ref("users-blog/" + userID)
                              .once("value")
                              .then(function (snapshot) {
                                  if (snapshot.val()) {
                                      window.location.href = "MainPage.html";

                                  } else {
                                      window.location.href = "AccountSettings.html";
                                  }
                              });
                      }
                  });
              }
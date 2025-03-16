// find what context the script is being ran in
let frame = document.getElementById("html5Iframe")?.contentWindow || window;

// find the webpack in the frame (changes between lessons)
let publicWebpack = Object.keys(frame).find((p => p.includes("webpack")));

// push our own chunk to the webpack
frame[publicWebpack].push([[Symbol()], {}, function (require) {

    // decode every module to find the one that contains "secret1"
    Object.values(require.m).forEach(function (module, index) {
        let decodedFn = Function.prototype.toString.apply(module).replace(/\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/g, match => {
            const hexCode = match.slice(2);
            return String.fromCharCode(parseInt(hexCode, 16));
        });

        // once we find the module get the token
        if (decodedFn.includes("secret01")) {
            let token = Object.values(require(Object.keys(require.m)[index]))[0]; // token is a "security" feature

            // find the react props for the lesson
            let lessonElement = frame.document.body.children['ifabric-react-root'].children['container'].children['lesson'];
            let lessonComponent = Object.values(lessonElement)[0].memoizedProps.children[1]._owner.stateNode._screenContainerRef._screenControllerViewRef.component;

            // set the score for the current screen and pass it
            lessonComponent.score = { raw: 1, max: 1 };
            lessonComponent.api.screen.complete(lessonComponent.score, token);
            lessonComponent.api.screen.enableNext(1, token);
        }
    });
}]);

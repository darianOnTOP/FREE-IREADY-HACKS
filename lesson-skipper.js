let score = prompt("Score?");
Object.values(document.querySelector("#main-section"))[0].return.return.memoizedProps.store.dispatch({
    type: "features/lesson/COMPLETE_LESSON_COMPONENT",
    payload: {
        componentStatusId: html5Iframe.src.split("=")[1].split("&")[0],
        instructionLessonOutcome: {
            score: score
        },
    }
})
Object.values(document.getElementById("html5-lesson-splash"))[0].memoizedProps.children[1]._owner.pendingProps.navigateToPage("/student/lesson/completed/true/" + score);

document.addEventListener('Contentloaded',function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    //Do same for grid to show the events 
    // var modals = document.querySelectorAll('.modal');
    // M.Modal.init(modals);
});

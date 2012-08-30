$('#index').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){

		var myForm = $( '#teeForm' );
		    myForm.validate({
			invalidHandler: function( form, validator ) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData( data );
		}
	});
	
	//any other code needed for addItem page goes here
	$( '#displayData' ).on( 'bind', getData );
	$( '#clearData'   ).on( 'bind', clearLocal );
	$( '#addNew'      ).on( 'bind', windowReload );
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 for ( var n in json )
		{
			var id = Math.floor( Math.random()*10001 );
			localStorage.setItem( id, JSON.stringify( json[n] ) );
		}
};

var getData = function(){

};

var storeData = function(data){
	
		if ( !key ) 
		{
			var id     = Math.floor( Math.random() * 10001 );
		}
		else
		{
			id         = key;
		}
		
		var item       = {};
		
		item.Options      = ["Course:",           $( '#Options' ).val()];
		item.reservist    = ["Reservist:",        $( '#reservist' ).val()];
		item.numberGames  = ["Number of Games:",  $( '#numberGames' ).val()];
		item.location     = ["Location:",         $( 'input[name=location]:checked', '#teeForm' ).val()];
		item.date         = ["Date:",        	  $( '#date' ).val()];
		item.notes        = ["Notes",             $( '#notes' ).val()];
		
		localStorage.setItem( id, JSON.stringify( item ) );
		alert( "Tee Time Added!" );
}; 

var	deleteItem = function (){
	var ask = confirm( "Are you sure you want to delete this Tee Time?" );
		if (ask)
		{
			localStorage.removeItem( this.key );
			window.location.reload();
			alert( "Tee Time deleted!" );
		}
		else
		{
			alert( "Tee Time not deleted." );
		}
};
					
var clearLocal = function(){
	if( localStorage.length === 0 ){
			alert( "You have no saved Tee Times." );
		}else{
			localStorage.clear();
			alert( "All Tee Times have been deleted!" );
			window.location.reload();
			return false;
		}
};



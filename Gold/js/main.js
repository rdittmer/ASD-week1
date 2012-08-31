$('#index').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){

		var myForm = $( '#teeForm' );
		    myForm.validate({
			invalidHandler: function( form, validator ) {
			},
			submitHandler: function() {
			storeData();
		}
	});
	
	//any other code needed for addItem page goes here
	$( '#displayData' ).on( 'click', getData );
	$( '#clearData'   ).on( 'click', clearLocal );
	$( '#addNew'      ).on( 'click', windowReload );
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autoFillData = function (){
	 for ( var n in json )
		{
			var id = Math.floor( Math.random()*10001 );
			localStorage.setItem( id, JSON.stringify( json[n] ) );
		}
};

var getData = function(){
 toggleControls( "on" );
		if( localStorage.length === 0 )
		{
			alert( "You currently have no saved Tee Times. Auto add default Tee Times." );
			autoFillData();
		}
		//NEW
		/*$( '#showData' ).append( '<div id="items" /> ' );
		$( '#items' ).append( '<ul id="makeList" /> ' );
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			$( '#makeList' ).append( '<li /> ' );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			$( '#makeList li' ).append( '<ul id="makeSubList" /> ' );
			for( var n in obj )
			{
				$( '#makeSubList' ).append( '<li />' );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				$( '#makeSubList li' ).last().append( optSubText );
				$( '#li' ).last().append( '<li id="linksLi" /> ' );
			} 
			//makeItemLinks( localStorage.key( i ), $('linksLi') );
		}*/
		
		//OLD
		var makeDiv  = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		$( '#showData' ).append( makeDiv );
		//document.body.appendChild( makeDiv );
		//$( 'items' ).style.display = "block";
		for( var i = 0, len = localStorage.length; i < len; i++ )
		{
			var makeli      = document.createElement( 'li' );
			var linksLi     = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key         = localStorage.key( i );
			var value       = localStorage.getItem( key );
			var obj         = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			//getImage( obj.group[1], makeSubList );
			for( var n in obj )
			{
				var makeSubli       = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText      = obj[n][0] + " " + obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild( linksLi );
			} 
			makeItemLinks( localStorage.key( i ), linksLi );
		}
};

var storeData = function( key ){
	
		var id;
	
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

var windowReload = function(){
		window.location.reload();
		return false;
}

function toggleControls( n )
	{
		switch( n )
		{
			case "on":
				$( '#teeForm' ).toggle( "hide" );
				//$( '#clearData' ).toggle( "show" );
				$( '#displayData' ).toggle( "hide" );
				$( '#addNew' ).removeClass( "ui-disabled" );
				break;
				
			case "off":
				$( '#teeForm' ).toggle( "show" );
				//$( '#clearData' ).toggle( "show" );
				$( '#displayData' ).toggle( "show" );
				$( '#addNew' ).addClass( "ui-disabled" );
				$( '#items' ).toggle( "hide" );
				break;
				
			default:
				return false;	
		}
	}

var editItem = function()
	{
		var value = localStorage.getItem( this.key );
		var item  = JSON.parse( value );
		
		toggleControls( "off" );
		
		$( '#Options' ).val( item.Options[1] );
		$( '#reservist' ).val( item.reservist[1] );
		$( '#numberGames' ).val( item.numberGames[1] );
		$( '#location' ).val( item.location[1] );
		$( '#date' ).val( item.date[1] );
		$( '#notes' ).val( item.notes[1] );
		
		thiskey         = this.key;
		$( '#submit' ).on( 'click', storeData( thiskey ) );
	}
	
function makeItemLinks( key, linksLi )
	{
		//NEW
		/*var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Tee Times";
		$( '#editLink').on( "click", editItem );
		$( '#editLink' ).html( "editText" );
		$( '#linksLi' ).append( "editLink" );
		
		var breakTag         = document.createElement( 'br' );
		$( '#linksLi' ).append( "breakTag" );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Tee Time";
		$( '#deleteLink' ).on( "click", deleteItem );
		$( '#deleteLink' ).html( "deleteText" );
		$( '#linksLi' ).append( "deleteLink" );*/
		
		//OLD
		var editLink         = document.createElement( 'n' );
		editLink.href        = "#";
		editLink.key         = key;
		var editText         = "Edit Tee Time";
		editLink.addEventListener( "click", editItem );
		editLink.innerHTML   = editText;
		linksLi.appendChild( editLink );
		
		var breakTag         = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
		
		var deleteLink       = document.createElement( 'n' );
		deleteLink.href      = "#";
		deleteLink.key       = key;
		var deleteText       = "Delete Tee Time";
		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
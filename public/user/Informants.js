define(
    ["use!backbone",
     "user/Informant"],
    function(Backbone, User) {
  
  var Informants = Backbone.Collection.extend(
      
    /** @lends Informants.prototype */ 
        
    {
      /**
       * @class 

       * @description
       * 
       * @extends Backbone.Model
       * 
       * @constructs
       * 
       */
    model: Informant,
    add : function(model, options) {
     
      }

   

  
  }); 
  
  return Informants; 
  
}); 

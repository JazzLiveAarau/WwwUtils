// File: UtilImage.js
// Date: 2025-04-07
// Author: Gunnar Lidén

// File content
// =============
//
// Class UtilImage
// One function that replaces, scales and positions an image in a container div
// The image will be scaled as much as possible and centered in the container
//
class UtilImage
{
    // Replaces. scales and position an image in a <div> container. 
    // Input data:
    // i_image_file_name:  URL for the image that shall replace the existing image
    // i_el_div_container: Container <div> element. Container width and height must be set
    //                     (with no height set will multiple calls make div height smaller)
    //
    // The image will be scaled to fit the container and the picture will be centered
    // horizontally and vertically
    // 1. Check input file name
    // 2. Get existing element in the div container. Call of UtilImage.getImageElement
    // 3. Create a new Image <img> object for the input image
    //    Call of new Image()
    // 4. Define an Image.onload event function calling UtilImage.callbackAfterLoad
    //    The input image must be loaded before the calculation of scale factor and translations
    //    (This statement must come prior to setting the Image.src to the new image)
    // 5. Add an Image event listener 'error' calling UtilImage.callbackImageNotFound
    //    Call of Image.addEventListener
    // 6. Set the input image file name for the new Image
    //    Call of Image.src
    //
    // Refences
    // https://bytes.com/topic/javascript/answers/848200-how-pass-parameter-via-image-onload-function-call
    // https://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript
    static replaceImageInDivContainer(i_image_file_name, i_el_div_container)
    {
        if (i_image_file_name.length < 4)
        {
            alert("UtilImage.replaceImageInDivContainer Image file name is not defined");

            return;
        }

        var el_image_in_div = UtilImage.getImageElement(i_el_div_container);

        if (null == el_image_in_div)
        {
            return;
        }

        var el_new_image = new Image();

        el_new_image.onload = function () {UtilImage.callbackAfterLoad(el_new_image, el_image_in_div, i_el_div_container); };

        el_new_image.addEventListener('error', UtilImage.callbackImageNotFound);

        el_new_image.src = i_image_file_name;

    } // replaceImageInDivContainer

    // Error callback function for the case that the image file is missing
    static callbackImageNotFound()
    {
        alert("UtilImage.callbackImageNotFound");

    } // callbackImageNotFound

    // Replace, scale and position the image in the <div> container
    // Callback function when the image has been loaded
    // 1. Check that the loading is completed
    //    Call of Image.complete
    // 2. Calculate the scale factor
    //    Call of UtilImage.getFitImageToDivScaleFactor
    // 3. Calculate scaled width and height for the new image
    // 4. Define an Image.onload event function
    // 4.1 Set image width and height. Call of Image.width and Image.height
    // 4.2 Center the image vertically and horizontally
    //     Call of UtilImage.centerImage
    // 5. Set the existing Image file name equal to the new Image file name
    //    Call of Image.src
    //
    // Refence
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_img_complete2
    static callbackAfterLoad(i_el_new_image, i_el_image_in_div, i_el_div_container)
    {
        if (!i_el_new_image.complete)
        {
            alert("UtilImage.callbackAfterLoad Image loading not complete");

            return;
        }

        var scale_factor = UtilImage.getFitImageToDivScaleFactor(i_el_new_image, i_el_div_container);

        console.log("UtilImage.callbackAfterLoad scale_factor= " + scale_factor.toString());

        var new_image_width = i_el_new_image.naturalWidth;
    
        var new_image_height = i_el_new_image.naturalHeight;
    
        var new_image_width_scaled = parseInt(new_image_width*scale_factor);
    
        var new_image_height_scaled = parseInt(new_image_height*scale_factor);

        i_el_image_in_div.onload = function () 
        { 
            i_el_image_in_div.width = new_image_width_scaled;

            i_el_image_in_div.height = new_image_height_scaled;

            UtilImage.centerImage(i_el_image_in_div, i_el_div_container);

        };

        i_el_image_in_div.src = i_el_new_image.src; 

    } // callbackAfterLoad

    // Place the picture in the center. Vertically and horizontally
    // 1. Calculate vertical translation and transform the image
    //    Call of Image.style.transform
    // 2. Center the image by adding CSS statements to the image element
    //    Call of Image.style.display,  Image.style.marginLeft and  Image.style.marginRight
    static centerImage(i_el_image_in_div, i_el_div_container)
    {
        var div_image_container_height = i_el_div_container.offsetHeight - 10; // px Adjusted with 10
        
        var image_height = i_el_image_in_div.height;

        var el_image = UtilImage.getImageElement(i_el_div_container);

        if (div_image_container_height - image_height > 50)
        {
            var translate_y = parseInt((div_image_container_height - image_height)/2.0);

            el_image.style.transform = 'translateY(' + translate_y.toString() + 'px)';
        }
        else
        {
            el_image.style.transform = 'none';

            i_el_image_in_div.style.marginTop ="2px";
        }

        i_el_image_in_div.style.display ="block";

        i_el_image_in_div.style.marginLeft ="auto";

        i_el_image_in_div.style.marginRight ="auto";
        
    } // centerImage

    // Returns the image element of the image container div
    // 1. Get all <img> elements in the input <div> container
    //    Call of HTML function getElementsByTagName
    // 2. Chech that it is only one <img> element
    // 3. Return the <img> element
    static getImageElement(i_el_div_container)
    {
        var img_list = i_el_div_container.getElementsByTagName("img");

        if (null == img_list || 0 == img_list.length)
        {
            alert("UtilImage.getImageElement There is no image in the image container");

            return null;            
        }

        if (img_list.length > 1)
        {
            alert("UtilImage.getImageElement There are multiple images in the div container");

            return null;                    
        }

        return img_list[0];

    } // getImageElement

    // Returns the scale factor that fits the input image in the input <div> container
    // 1. Get the input <div> container width and height. Adjust size with 10
    //    Call HTML element functions offsetHeight and offsetWidth
    // 2. Get the image width and height
    //    Call of Image.naturalWidth and Image.naturalHeight
    // 3. Calculate horizontal and vertical scale factors
    // 4. Return the smallest scale factor
    static getFitImageToDivScaleFactor(i_el_image, i_el_div_container)
    {
        var ret_scale_factor = -0.23456789;
     
        var div_photo_container_height = i_el_div_container.offsetHeight - 10; // px Adjusted with 10
    
        var div_photo_container_width = i_el_div_container.offsetWidth - 10; // py Adjusted with 10
    
        var modal_photo_height = i_el_image.naturalHeight;
    
        var modal_photo_width = i_el_image.naturalWidth;
    
        var scale_height = div_photo_container_height/modal_photo_height;
    
        var scale_width = div_photo_container_width/modal_photo_width;
    
        if (scale_height < scale_width)
        {
            ret_scale_factor = scale_height;
        }
        else
        {
            ret_scale_factor = scale_width;
        }
    
        return ret_scale_factor;
    
    } // getFitImageToDivScaleFactor

} // UtilImage

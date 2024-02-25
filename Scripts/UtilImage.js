// File: UtilImage.js
// Date: 2024-02-25
// Author: Gunnar Lidén

// File content
// =============
//
// Class UtilImage
// Functions for scaling and positioning of an image in an image container div
//
class UtilImage
{
    // Replace an image in a <div> container. 
    // The image will be scaled to fit the container and the picture will be centered
    // horizontally and vertically
    // 1. Check input file name
    // 2. Get existing element in the div container. Call of UtilImage.getImageElement
    // 3. Create an image element
    // 4. Load the image, i.e. set attribute src that takes some time before it is finished
    //    Call replaceImageInDivContainerAfterLoad with function setTimeout
    static replaceImageInDivContainer(i_image_file_name, i_el_div_container)
    {
        console.log("UtilImage.replaceImageInDivContainer i_image_file_name= " + i_image_file_name);

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

        // Call of replaceImageInDivContainerAfterLoad after loading of image (Image.src = 'my_image.jpg')
        // https://bytes.com/topic/javascript/answers/848200-how-pass-parameter-via-image-onload-function-call
        // This statement must come prior to Image.src
        el_new_image.onload = function () {UtilImage.replaceImageInDivContainerAfterLoad(el_new_image, el_image_in_div, i_el_div_container); };

        // https://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript
        el_new_image.addEventListener('error', UtilImage.imageNotFound);

        // Loading of the image takes time
        el_new_image.src = i_image_file_name;

    } // replaceImageInDivContainer

    // Error image no found
    static imageNotFound()
    {
        alert("UtilImage.imageNotFound");

    } // imageNotFound

    // Replace an image in a <div> container after load of the new picture 
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_img_complete2
    static replaceImageInDivContainerAfterLoad(i_el_new_image, i_el_image_in_div, i_el_div_container)
    {
        console.log("UtilImage.replaceImageInDivContainerAfterLoad Enter ");

        if (!i_el_new_image.complete)
        {
            alert("UtilImage.replaceImageInDivContainerAfterLoad Image loading not complete");

            return;
        }

        var scale_factor = UtilImage.getFitImageToDivScaleFactor(i_el_new_image, i_el_div_container);

        console.log("UtilImage.replaceImageInDivContainerAfterLoad scale_factor= " + scale_factor.toString());

        var new_image_width = i_el_new_image.naturalWidth;
    
        var new_image_height = i_el_new_image.naturalHeight;

        console.log("UtilImage.replaceImageInDivContainerAfterLoad new_image_width= " + new_image_width.toString());
    
        var new_image_width_scaled = parseInt(new_image_width*scale_factor);
    
        var new_image_height_scaled = parseInt(new_image_height*scale_factor);

        console.log("UtilImage.replaceImageInDivContainerAfterLoad new_image_width_scaled= " + new_image_width_scaled.toString());

        i_el_image_in_div.src =i_el_new_image.src; 

        i_el_image_in_div.width = new_image_width_scaled;

        i_el_image_in_div.height = new_image_height_scaled;

        UtilImage.centerImage(i_el_image_in_div, i_el_div_container);

    } // replaceImageInDivContainerAfterLoad

    // Place the picture in the center. Vertically and horizontally
    static centerImage(i_el_image_in_div, i_el_div_container)
    {
        var div_image_container_height = i_el_div_container.offsetHeight - 10; // px Adjusted with 10
        
        var image_height = i_el_image_in_div.height;

        console.log("UtilImage.centerImage image_height= " + image_height.toString());

        var el_image = UtilImage.getImageElement(i_el_div_container);

        if (div_image_container_height - image_height > 50)
        {
            var translate_y = parseInt((div_image_container_height - image_height)/2.0);

            console.log("UtilImage.replaceImageInDivContainerAfterLoad translate_y= " + translate_y.toString());

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

        console.log("UtilImage.getImageElement Exit ");

        return img_list[0];

    } // getImageElement

    // Returns the scale factor for an image that makes it fit to a given div element
    // Copied from Utility.js
    static getFitImageToDivScaleFactor(i_el_image, i_el_div_container)
    {
        var ret_scale_factor = -0.23456789;
     
        var div_photo_container_height = i_el_div_container.offsetHeight - 10; // px Adjusted with 10
    
        var div_photo_container_width = i_el_div_container.offsetWidth - 10; // px Adjusted with 10
    
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

        console.log("UtilImage.getFitImageToDivScaleFactor ret_scale_factor.width= " + ret_scale_factor.toString());
    
        return ret_scale_factor;
    
    } // getFitImageToDivScaleFactor

} // UtilImage

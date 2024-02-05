// File: UtilPayment.js
// Date: 2024-02-05
// Author: Gunnar Lidén

// File content
// =============
//
// Class with strings for payment options

class UtilPayment
{
    static twintAdmissionFeeString(i_width)
    {
        var ret_twint_str = '';
    
        ret_twint_str = ret_twint_str + UtilPayment.twintDivStart(i_width);
    
        ret_twint_str = ret_twint_str + UtilPayment.twintAdmissionHeaderString();
    
        ret_twint_str = ret_twint_str + UtilPayment.twintAdmissionTextString();
    
        ret_twint_str = ret_twint_str + UtilPayment.divEnd();
    
        return ret_twint_str;
    
    } // twintAdmissionFeeString

    static twintAdmissionHeaderString()
    {
        var ret_twint_h_str = '';
    
        ret_twint_h_str = ret_twint_h_str + UtilPayment.twintFontHeader();

        ret_twint_h_str = ret_twint_h_str + UtilPayment.twintTitleAdmissionFee();

        ret_twint_h_str = ret_twint_h_str + UtilPayment.fontEnd();

        return ret_twint_h_str;

    } // twintAdmissionHeaderString

    static twintAdmissionTextString()
    {
        var ret_twint_t_str = '';
    
        ret_twint_t_str = ret_twint_t_str + UtilPayment.twintFontHeader();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.paragraphStart();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.twintTextAdmissionFee();

        ret_twint_t_str = ret_twint_t_str + ' ' + UtilPayment.admissionFees();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.newLine();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.newLine();

        ret_twint_t_str = ret_twint_t_str +  ' ' + UtilPayment.twintPayerAdmissionFee();

        ret_twint_t_str = ret_twint_t_str +  ' ' + UtilPayment.twintAccountPayee();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.paragraphEnd();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.fontEnd();

        return ret_twint_t_str;

    } // twintAdmissionTextString

    // TWINT addmission fee title
    static twintTitleAdmissionFee()
    {
        return '<b>Eintritt mit TWINT zahlen</b>';

    } // twintTitleAdmissionFee

    // TWINT addmission text
    static twintTextAdmissionFee()
    {
        return 'Eintritte können mit TWINT im Voraus oder im Konzertsaal bezahlt werden.';

    } // twintTextAdmissionFee

    // Addmission fees
    static admissionFees()
    {
        return 'Der reguläre Eintritt beträgt Fr. 25.-, Supporter bezahlen Fr. 15.-.';

    } // admissionFees

    // TWINT addmission fee payer
    static twintPayerAdmissionFee()
    {
        return 'Bitte geben Sie Ihren Namen und das Konzertdatum bei der Bezahlung an.';

    } // twintPayerAdmissionFee

    // TWINT account payee
    static twintAccountPayee()
    {
        return 'Empfänger ist Hanni Heller, Telefonnummer +41 79 368 56 93.';

    } // twintAccountPayee

    // Credit card is not accepted
    static noCreditCard()
    {
        return '(Bezahlung mit Kreditkarte ist leider nicht möglich.)';

    } // noCreditCard

    // TWINT font header
    static twintFontHeader()
    {
        return  '<font size=3 face="Arial">';

    } // twintFontHeader

    // TWINT font text
    static twintFontText()
    {
        return  '<font size=3 face="Arial">';

    } // twintFontText

    // Font end
    static fontEnd()
    {
        return  '</font>';

    } // fontEnd

    // TWINT start <div> with styles
    static twintDivStart(i_width)
    {
        return  '<div style="margin:5px;  width:' + i_width + '; border: 1px solid blue; padding-left:15px;  padding-right:15px;  padding-top:10px; padding-bottom:5px;" >';

    } // twintDivStart

    // Returns div end tag </div>
    static divEnd()
    {
        return  '</div>';

    } // divEnd

    // Returns new line tag <br>
    static newLine()
    {
        return  '<br>';

    } // newLine

   // Returns start paragraph tag <p>
   static paragraphStart()
   {
       return  '<p>';

   } // paragraphStart

   // Returns end paragraph tag </p>
   static paragraphEnd()
   {
       return  '</p>';

   } // paragraphEnd


} // UtilPayment

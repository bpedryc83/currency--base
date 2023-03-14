export const convertPLNToUSD = (PLN) => {

  if (typeof PLN === "undefined") {
    return NaN;
  }
  else if (typeof PLN !== "string" && typeof PLN !== "number") {
    return 'Error';
  }
  else { 
    if (!isNaN(PLN)){
      if (PLN > 0){
        const PLNtoUSD = PLN / 3.5;
        
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        });

        return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
      }
      else {
        return '$0.00';
      }
    }
    else {
      if (isNaN(PLN)){
        return NaN;
      }
    }
  }
}
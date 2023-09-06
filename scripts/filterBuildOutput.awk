{ print $0; system(""); }
$0 ~ /make all/ {logOutput=1; buildStepNumber=$1;}
$1 != buildStepNumber { logOutput=0; next; }
logOutput == 0 { next; }
{ print $0 >>"build.log" }
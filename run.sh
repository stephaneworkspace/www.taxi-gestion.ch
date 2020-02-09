#!/bin/bash
############################################################################### 
#  _____          _        ____           _   _                   _             
# |_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__          
#   | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \         
#   | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |        
#   |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|        
#                                                                               
#  By Stéphane Bressani                                                         
#   ____  _             _                                                       
#  / ___|| |_ ___ _ __ | |__   __ _ _ __   ___                                  
#  \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \                                 
#   ___) | ||  __/ |_) | | | | (_| | | | |  __/                                 
#  |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|                                 
#                | |stephane-bressani.ch                                        
#                |_|github.com/stephaneworkspace                                
#                                                                               
###############################################################################
#
# Use for debug without IIS
#
# Constants.PROD must be false in TaxiGestion/Program.cs
#
###############################################################################
docker stop wwwtaxi
docker rm wwwtaxi
docker build -t taxigestion .
docker run -it --name wwwtaxi -p 80:80 -p 443:443 -e ASPNETCORE_URLS="http://+80" -e ASPNETCORE_ENVIRONMENT="Development" -v /app:/https/ -d taxigestion --restart always

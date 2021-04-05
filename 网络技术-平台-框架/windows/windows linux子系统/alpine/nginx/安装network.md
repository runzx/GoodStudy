## alpine setup network
 * ERROR: networking failed to start  
 * ERROR: cannot start nginx as networking would not start  

1. `apk add ifupdown` // 
2. `vi /etc/network/interfaces`  

    auto lo  
    iface lo inet loopback

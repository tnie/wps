QT += core gui network
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets
QMAKE_CXXFLAGS += -std=c++0x -Wno-attributes
TARGET = celestial_navigation
TEMPLATE = app

exists(/opt/kingsoft/wps-office/office6/libstdc++.so.6){
        system(ln -s /opt/kingsoft/wps-office/office6/libstdc++.so.6  libstdc++.so.6)
	LIBS += libstdc++.so.6
}

QMAKE_LFLAGS += -Wl,--rpath=\'\$\$ORIGIN\':$$[QT_INSTALL_LIBS]:/opt/kingsoft/wps-office/office6
QMAKE_LIBDIR =  ./ $$[QT_INSTALL_LIBS]  /opt/kingsoft/wps-office/office6

greaterThan(QT_MAJOR_VERSION, 4){
        LIBS += -lrpcetapi_sysqt5
	exists(/opt/kingsoft/wps-office/office6/libc++abi.so.1){
		system(ln -sf /opt/kingsoft/wps-office/office6/libc++abi.so.1  libc++abi.so.1)
		LIBS += libc++abi.so.1
	}
}
else{
        LIBS += -lrpcetapi
}


INCLUDEPATH = . \
                ./et \
                ../include/common \
                ../include/et
SOURCES += main.cpp\
                et/etmainwindow.cpp

HEADERS  += \
                et/etmainwindow.h

FORMS +=


DISTFILES +=

RESOURCES += \
    translation.qrc

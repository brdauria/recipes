<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="message"></xsl:param>

    <xsl:template match="catalog">
        <input id="recipes" type="hidden" onchange="update()"></input>
        <div id="scroll-area" class="col-lg-12 col-md-10">
            <xsl:attribute name="default">
                <xsl:value-of select="default-recipe"/>
            </xsl:attribute>
            <div id="scroll-data" class="cover-container">
                <!-- FOR EACH recipes/recipe -->
                <xsl:for-each select="recipes/recipe">
                    <div class="cover-item left object" onmousedown="return false;">
                        <xsl:attribute name="id">
                            <xsl:value-of select="id"/>
                        </xsl:attribute>
                        <xsl:attribute name="onclick">update("<xsl:value-of select="id"/>")</xsl:attribute>
                        <img>
                            <xsl:attribute name="src">
                                <xsl:value-of select="image"/>
                            </xsl:attribute>
                            <xsl:attribute name="alt">
                                <xsl:value-of select="name"/>
                            </xsl:attribute>
                        </img>
                        <p class="object">
                            <xsl:value-of select="name"/>
                        </p>
                    </div>
                </xsl:for-each>

                <!-- <div id="right" onclick="toRight()"></div> -->
            </div>
        </div>
    </xsl:template>

    <xsl:template match="catalog/store"></xsl:template>

</xsl:stylesheet>
<?xml version="1.0" encoding="ISO-8859-1"?>
<!-- Edited by XMLSpy® -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="message"></xsl:param>

    <xsl:variable name="lcletters">abcdefghijklmnopqrstuvwxyz</xsl:variable>
    <xsl:variable name="ucletters">ABCDEFGHIJKLMNOPQRSTUVWXYZ</xsl:variable>

    <xsl:template match="catalog">
        <xsl:apply-templates select="recepies/recipe[id=$message]" mode="normal"/>
    </xsl:template>

    <xsl:template match="recipe" mode="normal">
        <div id="quantities" class="row">
            <xsl:call-template name="quantities"/>
        </div>
        <div id="ingredients" class="row">
            <xsl:apply-templates select="ingredient" mode="normal"/>
        </div>
    </xsl:template>

    <xsl:template name="quantities">
        <div class="quantities form-group">
                <div class="quantities col-sm-3">
                    <label id="ldl-weight" class="lbl col">Peso</label>
                    <input id="weight" type="number" class="quantity form-control" unit="g" digit="0" onchange="weightUpdate()">
                        <xsl:attribute name="value">
                            <xsl:value-of select="standard-weight"/>
                        </xsl:attribute>
                    </input>
                </div>
                <div class="quantities col-sm-3 col-sm-offset-1">
                    <label id="ldl-qty" class="lbl col">Quantita'</label>
                    <input id="qty" type="number" class="quantity form-control" unit="" digit="1" onchange="qtyUpdate()">
                        <xsl:attribute name="value">
                            <xsl:value-of select="standard-qty"/>
                        </xsl:attribute>
                    </input>
                </div>
                <div class="quantities col-sm-3 col-xs-12 col-sm-offset-1">
                    <label id="ldl-wpu" class="lbl col">Peso per unita'</label>
                    <input id="wpu" type="number" class="quantity form-control" unit="g" digit="2" disabled="disabled">
                        <xsl:attribute name="value">
                            <xsl:value-of select="weight-per-unit"/>
                        </xsl:attribute>
                    </input>
                </div>
        </div>
    </xsl:template>

    <xsl:template match="ingredient" mode="normal">
        <div class="ingredient col-sm-4 well col-sm-offset-1">
            <xsl:variable name="ingname">ing<xsl:value-of select="position()"/></xsl:variable>
            <xsl:attribute name="id">
                <xsl:value-of select="$ingname"/>
            </xsl:attribute>
            <!-- Is there a flavor attribute? -->
            <div style="overflow: hidden;">
                <xsl:choose>
                    <xsl:when test="@storeid">
                        <xsl:variable name="storeid">
                            <xsl:value-of select="@storeid"/>
                        </xsl:variable>
                        <!-- Insert image and name -->
                        <xsl:apply-templates select="/catalog/store/product[id=$storeid]" mode="normal">
                            <xsl:with-param name="ingname" select="$ingname" />
                        </xsl:apply-templates>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="name"/>
                        <input class="weight col-xs-5" type="text" disabled="disabled" value="">
                            <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-weight</xsl:attribute>
                            <xsl:attribute name="unit">
                                <xsl:value-of select="unit"/>
                            </xsl:attribute>
                            <xsl:attribute name="digit">
                                <xsl:value-of select="digit"/>
                            </xsl:attribute>
                        </input>
                    </xsl:otherwise>
                </xsl:choose>
                <input class="perc" type="hidden">
                    <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-perc</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:value-of select="percent"/>
                    </xsl:attribute>
                </input>
            </div>
        </div>
    </xsl:template>

    <xsl:template match="product" mode="normal">
        <xsl:param name="ingname" />
        <div class="picture col-md-8 col-xs-12">
            <img width="130px" height="130px">
                <xsl:attribute name="src"><xsl:value-of select="image"/></xsl:attribute>
                <xsl:attribute name="alt"><xsl:value-of select="name"/></xsl:attribute>
            </img>
        </div>
        <div class="col-md-4 col-xs-12">
            <div class="caption lbl col-md-12"><xsl:value-of select="name"/></div>
            <input class="weight" type="text" disabled="disabled" value="">
                <xsl:attribute name="id"><xsl:value-of select="$ingname"/>-weight</xsl:attribute>
                <xsl:attribute name="unit"><xsl:value-of select="unit"/></xsl:attribute>
                <xsl:attribute name="digit"><xsl:value-of select="digit"/></xsl:attribute>
            </input>
        </div>
    </xsl:template>
</xsl:stylesheet>